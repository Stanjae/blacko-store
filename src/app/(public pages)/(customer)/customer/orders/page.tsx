import OrdersList from '@/app/components/customer/OrdersList'
import CustomLoader from '@/app/components/CustomLoader'
import { auth } from '@/auth'
import { ShoppingBagOutlined } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import React, { Suspense } from 'react'

const page = async() => {
  const session = await auth()
  return (
    <section className=' space-y-6'>
      <Stack gap={2} direction={'row'}>
        <IconButton size='medium'  disabled disableRipple className=' bg-gray-100 rounded-lg text-primary'><ShoppingBagOutlined/></IconButton>
        <Typography variant='h2' className=' font-semibold capitalize text-[25px] leading-[37.5px]'>My Orders</Typography>
      </Stack>
      <Suspense fallback={<CustomLoader/>}>
        <OrdersList userId={session?.user?.id}/>
      </Suspense>
    </section>
  )
}

export default page