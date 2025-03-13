import { MiniUserOrdersType } from '@/utils/definitions'
import { ArrowForward, Cancel, CheckCircle } from '@mui/icons-material'
import { Card, Chip, IconButton, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import CusPopover from './CusPopover'

const TabularCard = ({item}:{item:MiniUserOrdersType}) => {
  const dateOrdered = dayjs(item?._createdAt).format('MMM d, YYYY')
  return (
    <Card className=' px-5 py-6' elevation={0}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography className=' leading-4 font-medium'>{item?.reference_id}</Typography>
            {item?.transaction_status =='SUCCESS' ? <CusPopover color='success' text='Successful Transaction'><CheckCircle color='success'/></CusPopover>
            : <CusPopover color='error' text='Failed Transaction'><Cancel color='error'/></CusPopover>}

            <Chip color={item?.shipping_status == "1" ? 'info': item?.shipping_status == "2" ? "warning":"success"} 
            label={item?.shipping_status == "1" ? 'Processing': item?.shipping_status == "2" ? "Shipped":"Arrived"}/>
            <Typography component={'p'} className='text-center text-sm'>{dateOrdered}</Typography>
            <Typography component={'p'} className='text-center text-sm'>&#8358; {item?.total_amount}</Typography>
            <IconButton LinkComponent={Link} href={`/customer/orders/${item?._id}`}><ArrowForward/></IconButton>
        </Stack>
      
    </Card>
  )
}

export default TabularCard
