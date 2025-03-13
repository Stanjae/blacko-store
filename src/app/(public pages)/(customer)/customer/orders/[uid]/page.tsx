import OrderItemsSummary from '@/app/components/customer/OrderItemsSummary'
import TrackingShipment from '@/app/components/customer/TrackingShipment'
import CustomLoader from '@/app/components/CustomLoader'
import { getOrderShippingStatus } from '@/app/lib/data'
import { auth } from '@/auth'
import { UserOrderDetailType } from '@/utils/definitions'
import { ShoppingBagOutlined } from '@mui/icons-material'
import { Button, IconButton, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import React, { Suspense } from 'react'

const page = async({params}:{params:Promise<{ uid: string }>}) => {
  const uid = (await params).uid;
  const session = await auth()

  const response:UserOrderDetailType = await getOrderShippingStatus(uid, session?.user?.id)
  return (
    <section className=' space-y-6'>
      <Stack gap={2} direction={'row'}>
        <IconButton size='medium'  disabled disableRipple className=' bg-gray-100 rounded-lg text-primary'><ShoppingBagOutlined/></IconButton>
        <Typography variant='h2' className=' font-semibold capitalize text-[25px] leading-[37.5px]'>Order {response?.reference_id}</Typography>
        <Button size='large' LinkComponent={Link} href='/customer/orders' disableElevation className=' px-6 rounded-lg bg-primary/20 ml-auto'>Back</Button>
      </Stack>
        <Suspense fallback={<CustomLoader/>}>
            <TrackingShipment order={response}/>
        </Suspense>

        <Suspense fallback={<CustomLoader/>}>
            <OrderItemsSummary orderId={uid} userId={session?.user?.id}/>
        </Suspense>
      
    </section>
  )
}

export default page
