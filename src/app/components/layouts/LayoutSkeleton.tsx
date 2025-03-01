import { Grid2 } from '@mui/material'
import React from 'react'
import ProductCardSkeleton from '../skeletons/ProductCardSkeleton'

const LayoutSkeleton = ({arrayCount, gridSizeMd, gridColumn, gridSizeSm}:
    {arrayCount:number; gridSizeMd:number; gridSizeSm:number; gridColumn:number}) => {
  return (
        <Grid2 spacing={2} columns={gridColumn} container>
                {Array(arrayCount).fill('_')?.map((item, index)=>(
                <Grid2 key={index} size={{sm:gridSizeSm, xs:gridColumn, md:gridSizeMd}}><ProductCardSkeleton /></Grid2>
            ))}
            
        </Grid2>
  )
}

export default LayoutSkeleton