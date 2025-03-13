import { getUserOrdersCounts } from '@/app/lib/data'
import { Card, Grid2, Typography } from '@mui/material'
import React from 'react'

const CardList = async({id}:{id:string | undefined}) => {
    const {getUserAllOrders, getUserAllProcessing, getUserAllShipped, getUserAllDelivered} = await getUserOrdersCounts(id)

  return (
   <Grid2 alignItems={'stretch'}  spacing={2} container>
        <Grid2 size={3}>
            <Card className=' h-full flex flex-col items-center rounded-xl px-[20px] py-[16px] text-center' elevation={0}>
                <Typography color={'primary'} className='text-xl leading-[30px]'>{getUserAllOrders}</Typography>
                <Typography color='textDisabled' className=' text-[13px] leading-[19.5px]'>All Orders</Typography>
            </Card>
        </Grid2>
        
        <Grid2 size={3}>
            <Card className='h-full flex flex-col items-center px-[20px] py-[16px] rounded-xl text-center' elevation={0}>
            <Typography color={'primary'} className='text-xl leading-[30px]'>{getUserAllProcessing}</Typography>
            <Typography color='textDisabled' className=' text-[13px] leading-[19.5px]'>Processing Shipment</Typography>
            </Card>
        </Grid2>

        <Grid2 size={3}>
            <Card className=' h-full flex flex-col items-center px-[20px] py-[16px] rounded-xl text-center' elevation={0}>
                <Typography color={'primary'} className='text-xl leading-[30px]'>{getUserAllShipped}</Typography>
                <Typography color='textDisabled' className=' text-[13px] leading-[19.5px]'>Shipped Off</Typography>
            </Card>
        </Grid2>
        

        <Grid2 size={3}>
            <Card className=' h-full flex flex-col items-center px-[20px] py-[16px] rounded-xl text-center' elevation={0}>
                <Typography color={'primary'} className='text-xl leading-[30px]'>{getUserAllDelivered}</Typography>
                <Typography color='textDisabled' className=' text-[13px] leading-[19.5px]'>Delivered Shipments</Typography>
            </Card>
        </Grid2>
        
   </Grid2>
  )
}

export default CardList