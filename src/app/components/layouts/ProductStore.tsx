'use client'
import { Box, Divider, Grid2, Paper } from '@mui/material'
import React, { useState } from 'react'
import ProductStoreControls from '../ProductStoreControls';
import { ProductStoreType } from '@/utils/definitions';
import ProductCard from '../ProductCard';
import RangeSlider from '../PriceSlider';
import RatingFilters from '../RatingFilters';


const ProductStore = ({products}:{products:ProductStoreType[]}) => {
   const [newLayout, setNewLayout] = useState<boolean>(true)

  return (
    <Box component={'div'} className=' space-y-6'>
        <ProductStoreControls newLayout={newLayout} setNewLayout={setNewLayout}/>
        <div className=' flex relative gap-2'>
            <Paper component={'div'} elevation={0} className=' space-y-6 py-2 w-[20%]'>
                <RangeSlider/>
                <Divider/>
                <RatingFilters/>
            </Paper>
            <div className=' w-[80%]'>
               <Grid2 spacing={3} columns={{sm:newLayout ? 3:1}} container>
                {products?.map((item)=> (
                    <Grid2 key={item?._id} size={1}>
                    <ProductCard product={item}/>
                </Grid2>
                ))}
                
               </Grid2>
            </div>
        </div>
    </Box>
  )
}

export default ProductStore