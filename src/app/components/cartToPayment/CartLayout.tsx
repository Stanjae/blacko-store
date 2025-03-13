'use client'
import { Box, Button, Chip, Divider, Grid2, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import { useCounterStore } from '@/app/providers/storeProvider'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import AutocompleteSelection from '../AutocompleteSelect'
import {useForm} from 'react-hook-form'
import { cartFormSchema } from '@/utils/zod'
import { CartFormType } from '@/utils/definitions'
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const CartLayout = ({states}:{states:string[]}) => {
    const {newCart, totalPrice, totalShippingPrice, finalTotalPrice, totalTax} = useCounterStore((state) => state);

    const router = useRouter()

    const [show, setShow] = useState(false);

    const [lga, setLga] = useState<string | null>('')
    const [newState, setNewState] = useState<string | null>(states[0])

    const [err, setErr] = useState(false)

    const {data} = useQuery({ queryKey: ['todos', newState], 
        queryFn: async()=> await axios.get(`https://nga-states-lga.onrender.com/?state=${newState}`) })


    const {register, handleSubmit, setValue, formState:{isSubmitting, errors}} = useForm<CartFormType>({ resolver: zodResolver(cartFormSchema) });

    const onSubmit = (data:CartFormType) => {
        if(lga == '' || !lga){
            setErr(true)
            return
        }
        const form = {...data, lga, state:newState}
        sessionStorage.setItem('cartForm', JSON.stringify(form));
        router.push('/checkout')
    }

    useEffect(()=>{
        const june = sessionStorage.getItem('cartForm')
        if(!june) return
        const july = JSON.parse(june);
        setValue('note', july.note);
        setValue('zipcode', july.zipcode);
        setNewState(july.state);
        setLga(july.lga)
    },[])
 
  return (
    <Box component={'div'}>
        <Grid2 spacing={3} container>
            <Grid2 component={'div'} className=' space-y-5' size={8}>
                {newCart.map((cartItem) =>(
                    <CartItem item={cartItem} key={cartItem._id}/>
                ))} 
            </Grid2>
            <Grid2 size={4}>
                <Paper component={'form'} onSubmit={handleSubmit(onSubmit)} className='p-4 space-y-5'>
                    <div className=' space-y-2'>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>SubTotal:</Typography>
                            <Typography className=' text-lg font-medium' variant='h4'>&#8358;{totalPrice().toFixed(2)}</Typography>
                        </Stack>
                        { show && (<div>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Shipping:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + &#8358;{totalShippingPrice().toFixed(2)}</Typography>
                        </Stack>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Tax:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + &#8358;{totalTax().toFixed(2)}</Typography>
                        </Stack>
                        <Divider variant='inset'/>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-lg' variant='body1' color='textDisabled'>Total:</Typography>
                            <Typography color='success' className=' text-lg font-medium' variant='h4'> + &#8358;{finalTotalPrice().toFixed(2)}</Typography>
                        </Stack>
                        </div>)
                        }
                    </div>
                    
                    <Divider/>
                    <Box component={'div'} className=' space-y-3 '>
                        <Typography component={'div'} className=' flex items-center font-medium text-sm'>Additional Comment <Chip  className='ml-3 bg-red-100 text-red-500' size='small' label="Note"/></Typography>
                        <TextField {...register('note')} fullWidth multiline rows={4}/>
                    </Box>
                    <Divider/>
                    <Box component={'div'} className=' space-y-3 '>
                        <Typography className=' flex items-center font-medium text-sm'>Shipping Estimates</Typography>
                        <AutocompleteSelection  value={newState} setValue={setNewState} states={states} label='Select your State'/>
                        <div>
                            <AutocompleteSelection  value={lga} setValue={setLga} states={data?.data} label='Select your City'/>
                            {err && <Typography color='error' variant='body2'>City is required</Typography>}
                        </div>
                        
                        <TextField error={!!errors.zipcode} helperText={errors?.zipcode?.message} {...register('zipcode')} fullWidth label='Zip Code'/>
                    </Box>
                    <Stack spacing={1}>
                        <Button type='button' onClick={()=>setShow(true)} variant='outlined'>Calculate Shipping</Button>
                        <Button loading={isSubmitting} type='submit' disableElevation variant='contained'>CheckOut Now</Button>
                    </Stack>
                    
                </Paper>
            </Grid2>
        </Grid2>
    </Box>
  )
}

export default CartLayout
