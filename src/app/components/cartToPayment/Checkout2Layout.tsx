'use client'
import { Box, Button, Chip, Divider, Grid2, Paper, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useCounterStore } from '@/app/providers/storeProvider'
import {useForm} from 'react-hook-form'
import { cartShippingSchema } from '@/utils/zod'
import {CartShippingType} from '@/utils/definitions'
import {zodResolver} from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import MaterialUISelect from './CountrySelectorUi'
import AutocompleteSelection from '../AutocompleteSelect'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const Checkout2Layout = ({states}:{states:string[]}) => {
    const { totalPrice, totalShippingPrice, finalTotalPrice, totalTax} = useCounterStore((state) => state);

    const router = useRouter()

    const [country, setCountry] = useState<string>('Nigeria')

    const [lga, setLga] = useState<string | null>('')
    const [newState, setNewState] = useState<string | null>(states[0])

     const [err, setErr] = useState(false)

    const {data} = useQuery({ queryKey: ['todos', newState], 
        queryFn: async()=> await axios.get(`https://nga-states-lga.onrender.com/?state=${newState}`) })


    const {register, handleSubmit, formState:{isSubmitting, errors}} = useForm<CartShippingType>({ resolver: zodResolver(cartShippingSchema) });

    const onSubmit = (data:CartShippingType) => {
        if(lga == ""){
            setErr(true);
            return
        }
        const { zipcode, note, ...otherData} = data;
        const cart = {zipcode, note, lga, state:newState}
        const shopping = {...otherData, country}
        sessionStorage.setItem('cartForm', JSON.stringify(cart));
        sessionStorage.setItem('shippingForm', JSON.stringify(shopping));
        router.push('/payment')
    }

 
  return (
    <Box component={'div'}>
        <Grid2 spacing={3} container>
            <Grid2 component={'div'} className=' space-y-5' size={8}>
                <form className=' space-y-5'  onSubmit={handleSubmit(onSubmit)}>
                    <Paper className='p-4 space-y-5'>
                        <Typography component={'div'} className=' flex gap-2 items-center font-medium text-sm'>
                            <Typography bgcolor={'primary.main'} className=' flex justify-center items-center text-white rounded-full w-7 h-7' >1</Typography>
                            Shipping Address
                        </Typography>
                    
                        <Grid2 columns={2} spacing={3} container>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.fullName} helperText={errors.fullName?.message} size='small' placeholder='Full Name' {...register('fullName')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} size='small' placeholder='Phone Number' {...register('phoneNumber')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.email} helperText={errors.email?.message} size='small' placeholder='Email' {...register('email')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.company} helperText={errors.company?.message} size='small' placeholder='Company' {...register('company')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><TextField error={!!errors.address} helperText={errors.address?.message} size='small' placeholder='Address' {...register('address')} fullWidth/></Grid2>
                            <Grid2 size={{xs:2, sm:1}}><MaterialUISelect setCountry={setCountry} country={country} label='Country'/></Grid2>
                        </Grid2>
                    
                    </Paper>

                    <Paper className='p-4 space-y-5'>
                        <Typography component={'div'} className=' flex gap-2 items-center font-medium text-sm'>
                            <Typography bgcolor={'primary.main'} className=' flex justify-center items-center text-white rounded-full w-7 h-7' >2</Typography>
                            Additional Info
                        </Typography>
                        <Box component={'div'} className=' space-y-3 '>
                            <Typography component={'div'} className=' flex items-center font-medium text-sm'>Comment (Optional) <Chip  className='ml-3 bg-red-100 text-red-500' size='small' label="Note"/></Typography>
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
                            <Typography className=' text-lg font-medium' variant='h4'>&#8358;{totalPrice().toFixed(2)}</Typography>
                        </Stack>

                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Shipping:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + &#8358;{totalShippingPrice().toFixed(2)}</Typography>
                        </Stack>
                        <Stack className=' items-center justify-between' direction={'row'}>
                            <Typography className=' text-sm' variant='body1' color='textDisabled'>Tax:</Typography>
                            <Typography color='success' className=' text-base font-medium' variant='h4'> + &#8358;{totalTax()}</Typography>
                        </Stack>
                    </div>
                    <Divider/>
                    <Typography gutterBottom className=' font-semibold text-[25px] leading-[37.5px]' color='secondary' variant='h2'>&#8358;{finalTotalPrice().toFixed(2)}</Typography>
                </Paper>
            </Grid2>
        </Grid2>
    </Box>
  )
}

export default Checkout2Layout
