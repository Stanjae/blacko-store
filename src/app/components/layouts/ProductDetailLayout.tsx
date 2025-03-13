'use client'
import React, { useState } from 'react'
import HoverRating from '@/app/components/AddRatings'
import { urlFor } from '@/app/components/ProductCard'
import { Avatar, Button, Chip, Grid2, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { DetailedProductStoreType } from '@/utils/definitions'
import { useCounterStore } from '@/app/providers/storeProvider'


type variationParams = {
    size: {
        "unit": number;
        "variant": string;
        "_key"?: string;
    }[];
    discount: number;
    _key: string;
    newPrice: number;
    imageVariant: {
        "_type": string;
        "asset": {
            "_ref": string;
            "_type": "reference";
        };
    };
    color: string;
}

const ProductDetailLayout = ({product}:{product:DetailedProductStoreType}) => {
    const [variety, setVariety] = useState(product?.thumbnail)

    const [newAmount, setNewAmount] = useState({discount:product?.discount, basePrice:product?.basePrice})

    const [newSizes, setNewSizes] = useState<{
        unit: number;
        variant: string;
        _key?: string;
    } | null>(null)

    const [newIndex, setNewIndex] = useState<number>(100);

    const {newCart, addToMyCart, removeFromCart } = useCounterStore(
        (state) => state,
      )

    const addedToCart = newCart.find(c => c._id == product?._id);

    const handleChangeVariation = (item:variationParams, index:number)=>{
        setNewSizes(null)
        setNewIndex(index);
        setNewAmount({discount:item.discount, basePrice:item.newPrice});
        setVariety(item.imageVariant)
    }

    const setDefaults =()=>{
        setNewIndex(100);
        setNewSizes(null);
        setNewAmount({discount:product?.discount, basePrice:product?.basePrice});
        setVariety(product?.thumbnail)
    }

    const addToCart = ()=>{
        // Add to cart logic here
        const newItem = {_id:product?._id, price:newAmount?.discount, title:product?.title, thumbnail:urlFor(variety).url(),
            benchMarkQuty:newIndex == 100 ? product?.quantity : newSizes?.unit, quantity:1, variantInfo:newSizes, shippingStatus:product?.shippingStatus
        }
        if(addedToCart){
            removeFromCart(product?._id);
        }else{
            addToMyCart(newItem);
        }
    };

    const isAvailble = (!product.quantity ? true : false);
    const isSizeAvailable = (!newSizes ? true : false);

    
  return (
    <Grid2 container spacing={'87px'}>
      <Grid2 display={'flex'} gap={{xs:3, md:1}} flexDirection={{xs:'column', md:'row'}} size={{md:'auto', xs:12}}>
        {product?.images && <Stack direction={{xs:'row', md:'column'}} order={{xs:2, md:1}} spacing={1}>
            {product?.images?.map((image, index) => (
                <div className={` ${image?.asset?._ref == variety?.asset?._ref ? "bg-slate-800":"bg-transparent"}  p-1`} key={index}>
                    <Image onMouseOver={()=> setVariety(image)} className={` cursor-pointer`} width={50} height={50}  src={urlFor(image).url()} alt={image?._type}/>
                </div>
            ))} 
        </Stack>}
        <Image className='transition-all ml-2 order-1 md:order-2 rounded-xl duration-500 object-cover w-full h-auto  md:w-[600px] md:h-[498px]' src={urlFor(variety).quality(100).width(1250).height(1250).url()} width={600} height={498} alt={product?.title}/>
      </Grid2>
      <Grid2 size={'grow'}>
        <Typography className=' text-3xl font-medium leading-[45px]' gutterBottom variant='h1'>{product?.title}</Typography>
        <div className=' flex items-center'>
            <HoverRating productId={product?._id}/> 
            <Typography variant='body2'>({product?.rating_count})</Typography>
        </div>

        <Typography mt={1} color='textSecondary' gutterBottom>{product?.description}</Typography>
        
        <Stack my={3} spacing={3} direction={'row'}>
            <div onClick={setDefaults} className={`${newIndex == 100 ? "bg-slate-900 text-slate-50":"bg-transparent"} rounded-lg cursor-pointer text-center p-1.5`}>
                <div className=' bg-gray-600 rounded-lg h-[80px] w-[80px]'/>
                <Typography component={'p'}  variant='body2'>Default</Typography>
            </div>
            {product?.variations?.map((variation, index) =>(
                <div onClick={()=> handleChangeVariation(variation, index)} key={index} className={`${newIndex == index ? "bg-slate-900 text-slate-50":"bg-transparent"} rounded-lg cursor-pointer text-center p-1.5`}>
                    <Image className=' rounded-lg' width={80} height={80} src={urlFor(variation?.imageVariant).url()} alt={variation?._key}/>
                    <Typography component={'p'}  variant='body2'>{variation?.color}</Typography>
                </div>
            ))}      
        </Stack>

        {newIndex != 100 && <Stack direction={'row'} alignItems={'center'} my={2} spacing={2}>
            <Typography variant='body2'>Sizes: </Typography>
            { newIndex != 100 && product?.variations[newIndex].size?.map((item, index)=>(
                <Chip key={index} onClick={()=> setNewSizes({unit:item?.unit, variant:item.variant,_key:item?._key})} variant={newSizes?._key == item?._key ? "filled":"outlined"} label={item?.variant + " size"}/>
            ))}
            
        </Stack>}

       {newSizes != null && <Typography variant='body1' gutterBottom color={newSizes?.unit > 0 ? "secondary":"primary"}>
            {newSizes?.unit > 0 ? "Stock Available":"Sold Out"}
        </Typography>}

        {newIndex == 100 && <Typography variant='body1' gutterBottom color={product.quantity ? "secondary":"primary"}>
            {product.quantity ? "Stock Available":"Sold Out"}
        </Typography>}

        <div className=' my-2'>
            <Typography variant='h2' className=' font-semibold text-2xl' color='primary'>Price: ${newAmount?.discount}</Typography>
            <Typography variant='body2'>Discount: <Typography className=' line-through' component={'span'} color='textDisabled'>${newAmount?.basePrice}</Typography></Typography>
            <Typography variant='body2'>Shipping: <Typography component={'span'} color={product?.shippingStatus == 0 ? "success":"primary"}>
                {product?.shippingStatus == 0 ? "Free Shipping": ("$ "+ product?.shippingStatus )}</Typography></Typography>
        </div>

        <div className=' my-5'>
           {newIndex == 100 && <Button  disabled={isAvailble} onClick={addToCart} variant={addedToCart ? 'outlined':'contained'} size='large' >
                {addedToCart ? "Added to Cart":"Add to Cart" }</Button>}

            {newIndex != 100 && <Button  disabled={isSizeAvailable} onClick={addToCart} variant={addedToCart ? 'outlined':'contained'} size='large' >
            {addedToCart ? "Added to Cart":"Add to Cart" }</Button>}
        </div>

        <Typography className=' gap-3 flex mt-7 items-center' component={'div'}>
            Sold by
            <Chip size='medium' avatar={<Avatar alt={product?.shopId?.title} src={urlFor(product?.shopId?.shop_image).url()} />}
            label={product?.shopId?.title} variant="outlined"/>
        </Typography>
      </Grid2>
    </Grid2>
  )
}

export default ProductDetailLayout