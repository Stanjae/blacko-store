'use client'
import { CartProductType } from '@/utils/definitions'
import React, { useState } from 'react'
import { useCounterStore } from '../providers/storeProvider';
import { Add, Close, Remove} from '@mui/icons-material';
import Image from 'next/image';
import { IconButton, Stack, Typography } from '@mui/material';

const AddToCartItem = ({item}:{item:CartProductType}) => {
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
    <div className=' w-full flex gap-2'>
                    <Image className=' rounded-xl' src={item.thumbnail} alt={item._id} width={75}height={75}/>
                    <div className=' grow'>
                        <Typography className=' text-sm font-medium' variant='body1' >{item.title}</Typography>
                        <Typography className=' text-xs' variant='body2' color='textDisabled'>${item.price} X {qty}</Typography>
                        <Stack alignItems={'center'} direction={'row'}>
                            <IconButton onClick={decrement} size='small'><Remove/></IconButton>
                            <Typography color='primary' variant='body2' component={'div'}>{qty}</Typography>
                            <IconButton onClick={increment} size='small'><Add/></IconButton>
                            <IconButton onClick={()=> removeFromCart(item?._id)} className=' ml-auto' size='medium'><Close/></IconButton>
                        </Stack>
                    </div>
                </div>
  )
}

export default AddToCartItem