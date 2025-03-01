'use client'
import { useCounterStore } from '@/app/providers/storeProvider';
import { CartProductType } from '@/utils/definitions';
import { Add, Close, Remove } from '@mui/icons-material';
import { Card, IconButton, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useState } from 'react'

const CartItem = ({item}:{item:CartProductType}) => {
    const {removeFromCart, updateQuantity} = useCounterStore((state) => state);
        const [qty, setQty] = useState(item?.quantity)
    
        const increment =()=>{
            if(qty == item?.benchMarkQuty) return;
            const jty = qty + 1;
            setQty(jty);
            updateQuantity(item?._id, jty);
        }
    
        const decrement =()=>{
            if(qty == 1) return;
            const jty = qty - 1;
            setQty(jty);
            updateQuantity(item?._id, jty);
        }
  return (
    <Card elevation={0} className=' w-full flex'>
                    <Image className=' overflow-hidden' src={item.thumbnail} alt={item._id} width={150}height={150}/>
                    <div className=' p-4 grow'>
                        <Typography component={'div'} gutterBottom className=' flex text-lg font-medium' variant='h3'>
                            {item.title}
                            <IconButton onClick={()=> removeFromCart(item?._id)} className=' ml-auto' size='medium'><Close/></IconButton>
                        </Typography>
                        <Typography gutterBottom className=' text-sm' component={'div'} color='textDisabled'>${item.price} X {qty}</Typography>
                        <Typography component={'div'} variant='body2' color='textSecondary' className=' flex items-center' gutterBottom><Typography color='success'> {item.shippingStatus == 0 ? " Free Shipping ": `+ $${item.shippingStatus} ` }</Typography>(Shipping)</Typography>
                        <Stack alignItems={'center'} direction={'row'}>
                            <IconButton onClick={decrement} className=' border border-blue-600' size='medium'><Remove/></IconButton>
                            <Typography color='primary' variant='body1' component={'div'}>{qty}</Typography>
                            <IconButton onClick={increment} size='medium'><Add/></IconButton>
                        </Stack>
                    </div>
    </Card>
  )
}

export default CartItem
