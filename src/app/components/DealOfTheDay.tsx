
import { ArrowRightAlt } from '@mui/icons-material'
import { Box, Button, Grid2, Stack, Typography } from '@mui/material'
import React from 'react'
import ProductCard from './ProductCard'
import { ProductStoreType } from '@/utils/definitions'
import { getVarietyProducts } from '../lib/data'

const DealOfTheDay = async() => {
  const response =  await getVarietyProducts('deals-for-today', 4)
  return (
    <Box component={'div'} className=' space-y-6 my-20'>
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Typography className=' text-xl font-semibold leading-[30px]' variant='h3'>Deals Of The Day</Typography>
            <Button endIcon={<ArrowRightAlt/>} variant='text'>More Products</Button>
        </Stack>

        <Grid2 columns={5} justifyContent={'center'} spacing={2} container>
            {response?.map((item:ProductStoreType, index:number) => (
                 <Grid2 size={{sm:1, xs:5}} key={index}>
                    <ProductCard product={item}/>
                 </Grid2>
            ))}
           
        </Grid2>
    </Box>
  )
}

export default DealOfTheDay