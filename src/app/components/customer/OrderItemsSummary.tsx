import { getUserOrderDetails } from '@/app/lib/data';
import { RetrievedProductsType, UserOrderDetailType } from '@/utils/definitions';
import { Box, Button, Card, Divider, Grid2, Paper, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs';
import Image from 'next/image'
import React from 'react'

const OrderItemsSummary = async({userId, orderId}:{userId:string | undefined; orderId:string}) => {
    const response:UserOrderDetailType = await getUserOrderDetails(orderId, userId)

    const products:Array<RetrievedProductsType> = response?.products ? JSON.parse(response.products) : []
  return (
    <div>
       <Paper className=' bg-[#f3f5f9]'>
        <Stack className='p-4 text-sm' direction={'row'} justifyContent={'space-between'}>
            <Typography color='textDisabled' component={'div'}>Order Id: <Typography color='secondary' component={'span'}>{response?.reference_id}</Typography></Typography>
            <Typography color='textDisabled' component={'div'}>Placed On: <Typography color='secondary' component={'span'}>{dayjs(response?._createdAt).format("MMMM, DD, YYYY")}</Typography></Typography>
            <Typography color='textDisabled' component={'div'}>Delivered On: <Typography color='secondary' component={'span'}>{dayjs(response?.eta).format("MMMM, DD, YYYY")}</Typography></Typography>
        </Stack>
        <Box component={'div'} className='p-4 space-y-2' bgcolor={'custombg.main'}>
            {products?.map((item)=> (
                <Stack key={item?._id} justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
                <div className=' flex gap-2 items-center'>
                    <Image width={65} className='rounded-xl' height={65} src={item?.thumbnail} alt='lopp'/>
                    <div>
                        <Typography gutterBottom variant='h6' className=' text-sm leading-6'>{item?.title}</Typography>
                        <Typography color='textDisabled' className=' text-xs'>&#8358;{item?.price} *{item?.quantity}</Typography>
                    </div>
                </div>
                <Typography>Product Propeties: {item?.variantInfo ? "Variant":"None"}</Typography>
                <Button>Write a Review</Button>
            </Stack>
            ))}
            
        </Box>
      
        </Paper> 

        <Grid2 spacing={3} mt={5} container>
            <Grid2 size={6}>
                <Card elevation={0} className='p-5'>
                    <Typography gutterBottom className=' font-semibold text-base'>Shipping Address</Typography>
                    <Typography  variant='h6' className=' text-sm leading-6'>{response?.customer_address}</Typography>
                </Card>
            </Grid2>
            <Grid2 size="grow">
            <Paper elevation={0} className='p-4 space-y-5'>
                <Typography className=' text-lg font-semibold'>Total Summary</Typography>
                    <div className=' space-y-2'>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>SubTotal:</Typography>
                            <Typography className=' text-lg font-medium' variant='h4'>&#8358;{response?.subtotal}</Typography>
                        </Stack>

                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Shipping:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + &#8358;{response?.shipping_fee}</Typography>
                        </Stack>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Tax:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + &#8358;{response?.tax?.toFixed(2)}</Typography>
                        </Stack>
                    </div>
                    <Typography className='text-base font-medium'>Paid By: Monnify Card</Typography>
                    <Divider/>
                    <Typography gutterBottom className=' font-semibold text-[25px] leading-[37.5px]' color='secondary' variant='h2'>&#8358;{response?.total_amount}</Typography>
                </Paper>
            </Grid2>
        </Grid2>
    </div>
    
  )
}

export default OrderItemsSummary
