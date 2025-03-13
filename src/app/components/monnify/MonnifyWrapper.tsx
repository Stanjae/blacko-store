'use client'
import  React  from  "react";
import  Monnify  from  "monnify-js";
import { Button } from "@mui/material";
import { toast } from 'sonner'
import { allInfoType, MonnfiyRespone } from "@/utils/definitions";
import { useCounterStore } from "@/app/providers/storeProvider";
import { createTransactionOrder, updateProductQuantity } from "@/app/lib/data";
import { useRouter } from "next/navigation";
import { getDeliveryDate } from "@/utils/utilityFn";


const cartinfo = JSON.parse(sessionStorage.getItem('cartForm') || '{}');
const shippinginfo = JSON.parse(sessionStorage.getItem('shippingForm') || '{}');
function  MonnifyButton({uid}:{uid:string | undefined}) {
	const  monnify  =  new  Monnify("MK_TEST_24YVYTQYZQ", "8359192849");
	const {push} = useRouter()

	const {finalTotalPrice, newCart, clearCart, totalShippingPrice, totalTax, totalPrice} = useCounterStore((state) => state);


	const userInfo:allInfoType = {...cartinfo, ...shippinginfo, uid, subtotal:totalPrice().toFixed(2), shipping_fee:totalShippingPrice().toFixed(2), tax:totalTax().toFixed(2), eta:getDeliveryDate(7), shipping_status:"1"};

	const handleOperations =async(response:MonnfiyRespone)=>{
		await createTransactionOrder(response, userInfo, JSON.stringify(newCart));
		if(response.status === "SUCCESS"){
			const transactions = await updateProductQuantity(newCart)
			if(transactions){
				clearCart();
				toast.success('Payment Successful. Your order has been placed');
				push(`/reference/${response.paymentReference}`)
			}
		}else{
			toast.error("Error in Processing Payment")
		}
	
	}


	function  pay() {
		if(!sessionStorage.getItem('cartForm') || !sessionStorage.getItem('shippingForm')){
			toast.error('Go Back and fill out your cart Information')
			return
		}
		monnify.initializePayment({
			amount:  finalTotalPrice().toFixed(2),
			currency:  "NGN",
			reference:  new  Date().getTime(),
			customerFullName:  userInfo?.fullName,
			customerEmail:  userInfo?.email,
			paymentDescription:  userInfo?.note,
			metadata: {
				'customData':  JSON.stringify(newCart),
			},
			onLoadStart: () => {
				console.log("Monnify SDK loading started");
			},
			onLoadComplete: () => {
				console.log("Monnify SDK is ready");
			},
			onComplete: (response:MonnfiyRespone) => {
				handleOperations(response);
			},
			onClose: (response:undefined) => {
				console.log("Payment modal closed:", response);
			},
		});
	}
	return  <Button color="secondary" variant="contained" size="large" onClick={() =>  pay()}>Pay Now</Button>;
}
export  default  MonnifyButton;