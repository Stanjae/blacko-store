'use client'
import { ProductStoreType } from '@/utils/definitions'
import { Button } from '@mui/material'
import React from 'react'
import { useCounterStore } from '../providers/storeProvider'
import { urlFor } from './ProductCard'


const AddtoCartBtn = ({item}:{item:ProductStoreType}) => {
     const {newCart, addToMyCart, removeFromCart } = useCounterStore((state) => state)

     const isAddedToCart = newCart.find(c => c._id == item?._id);

    const addToCart = ()=>{
            // Add to cart logic here
            const newItem = {_id:item?._id, price:item?.discount, title:item?.title, thumbnail:urlFor(item.thumbnail).url(),
                benchMarkQuty:item?.quantity,  quantity:1, variantInfo:null, shippingStatus:item.shippingStatus
            }
            if(isAddedToCart){
                removeFromCart(item?._id);
            }else{
                addToMyCart(newItem);
            }
        };
  return (
    <Button onClick={addToCart} variant={isAddedToCart ? "contained":'outlined'} className=' capitalize rounded-xl w-full block' color='secondary' size='large'>
        {isAddedToCart ? "Added": "Add to Cart" }
    </Button>
  )
  
}

export default AddtoCartBtn