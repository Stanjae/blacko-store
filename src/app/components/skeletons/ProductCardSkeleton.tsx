import { Button, Card, CardActions, CardContent, Skeleton, Typography } from '@mui/material'
import React from 'react'




const ProductCardSkeleton = () => {
 

  return (
    <Card className=' relative' elevation={0}>
        <Skeleton animation="wave" variant="rounded" width={'100%'} height={278} />
        <CardContent className=' text-center'>
            <Typography color='textPrimary' variant='body1' className='text-sm no-underline font-medium leading-[21px]'><Skeleton animation="wave" /></Typography>
            <Typography color='primary' className=' text-sm leading-[21px] font-semibold py-1 '><Skeleton animation="wave"/></Typography>
            <div className=' flex justify-center items-center gap-2'>
                <Skeleton animation="wave" />
                <Typography color='textDisabled' className=' text-xs' component={'span'}><Skeleton animation="wave" /></Typography>
            </div>
            
        </CardContent>
        <CardActions className='p-2'>
            <Button variant='outlined' className=' capitalize rounded-xl w-full block' color='secondary' size='large'><Skeleton animation="wave" /></Button>
        </CardActions>
    </Card>
  )
}

export default ProductCardSkeleton