'use client'
import { UserOrderDetailType } from '@/utils/definitions'
import { CheckBox, Inventory, LocalShipping } from '@mui/icons-material'
import { Box, Chip, Paper, Stack } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

const TrackingShipment = ({order}:{order:UserOrderDetailType}) => {
  return (
    <Paper className='p-6'>

        <Stack justifyContent={'space-between'} alignItems={'center'} direction={'row'}>
            <Box component={'div'} className=' h-16 w-16 flex justify-center items-center rounded-full' 
            bgcolor={order?.shipping_status >= "1" ? 'primary.main':"silver"}>
                <Inventory className=' text-white size-9'/>
            </Box>
            <Box component={'div'} bgcolor={order?.shipping_status >= "2" ? "primary.main":'silver'} className='grow h-1'/>
            <Box component={'div'} className=' h-16 w-16 flex justify-center items-center rounded-full' 
            bgcolor={order?.shipping_status >= "2" ? "primary.main":'silver'}>
                <LocalShipping className={`${order?.shipping_status >= "2" ? "text-white":'text-primary'} size-9`} />
            </Box>
            <Box component={'div'} bgcolor={order?.shipping_status == "3" ? "primary.main":'silver'} className='grow h-1'/>
            <Box component={'div'} className='  h-16 w-16 flex justify-center items-center rounded-full'
             bgcolor={order?.shipping_status == "3" ? "primary.main":'silver'}>
                <CheckBox className={`${order?.shipping_status >= "3" ? "text-white":'text-primary'} size-9`}/>
            </Box>
        </Stack>
        <Stack mt={5} direction={'row'}>
            <Chip className=' ml-auto' color='primary' size='medium' label={`Estimated Delivery Time: ${dayjs(order?.eta).format('MMMM DD, YYYY')}`}/>
        </Stack>
      
    </Paper>
  )
}

export default TrackingShipment
