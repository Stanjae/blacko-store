'use client'
import { Box, Button, Divider, Grid2, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCounterStore } from '@/app/providers/storeProvider'
import {useForm} from 'react-hook-form'
import { shippingAddressSchema } from '@/utils/zod'
import {ShippingFormType } from '@/utils/definitions'
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import MaterialUISelect from './CountrySelectorUi'

const CheckoutLayout = () => {
    const { totalPrice, totalShippingPrice, finalTotalPrice} = useCounterStore((state) => state);

    const router = useRouter()

    const [country, setCountry] = useState<string>('Nigeria')


    const {register, handleSubmit, setValue, formState:{isSubmitting, errors}} = useForm<ShippingFormType>({ resolver: zodResolver(shippingAddressSchema) });

    const onSubmit = (data:ShippingFormType) => {
        const r = sessionStorage.getItem('cartForm');
        if(!r) return;
        const form = {...data, country}
        console.log(form)
        sessionStorage.setItem('shippingForm', JSON.stringify(form));
        router.push('/payment')
    }

    useEffect(()=>{
        const june = sessionStorage.getItem('shippingForm')
        if(!june) return
        const july = JSON.parse(june);
        setValue('address', july.address);
        setValue('company', july.company);
        setValue('email', july.email);
        setValue('fullName', july.fullName);
        setValue('phoneNumber', july.phoneNumber);
    },[])
 
  return (
    <Box component={'div'}>
        <Grid2 spacing={3} container>
            <Grid2 component={'div'} className=' space-y-5' size={8}>
                <form className=' space-y-5'  onSubmit={handleSubmit(onSubmit)}>
                    <Paper className='p-4 space-y-5'>
                        <Typography className=' flex items-center font-medium text-sm'>Shipping Address</Typography>
                    
                        <Grid2 columns={2} spacing={3} container>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.fullName} helperText={errors.fullName?.message} size='small' placeholder='Full Name' {...register('fullName')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} size='small' placeholder='Phone Number' {...register('phoneNumber')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.email} helperText={errors.email?.message} size='small' placeholder='Email' {...register('email')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.company} helperText={errors.company?.message} size='small' placeholder='Company' {...register('company')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.address} helperText={errors.address?.message} size='small' placeholder='Address' {...register('address')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><MaterialUISelect setCountry={setCountry} country={country} label='Country'/></Grid2>
                        </Grid2>
                    
                    </Paper>
                    <Stack direction={'row'} spacing={1}>
                            <Button className=' block w-full' type='button' onClick={()=> router.back()} variant='outlined'>Back to Cart</Button>
                            <Button className=' block w-full' loading={isSubmitting} type='submit' disableElevation variant='contained'>Proceed to Payment</Button>
                    </Stack>
                </form>
                
            </Grid2>
            <Grid2 size={4}>
                <Paper className='p-4 space-y-5'>
                    <div className=' space-y-2'>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>SubTotal:</Typography>
                            <Typography className=' text-lg font-medium' variant='h4'>${totalPrice().toFixed(2)}</Typography>
                        </Stack>

                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Shipping:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + ${totalShippingPrice().toFixed(2)}</Typography>
                        </Stack>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Tax:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + $0</Typography>
                        </Stack>
                    </div>
                    <Divider/>
                    <Typography gutterBottom className=' font-semibold text-[25px] leading-[37.5px]' color='secondary' variant='h2'>${finalTotalPrice().toFixed(2)}</Typography>
                </Paper>
            </Grid2>
        </Grid2>
    </Box>
  )
}

export default CheckoutLayout
