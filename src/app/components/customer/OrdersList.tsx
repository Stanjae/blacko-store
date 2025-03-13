import { Box } from '@mui/material'
import React from 'react'
import TabularCard from './TabularCard'
import { getUserOrders } from '@/app/lib/data'
import { MiniUserOrdersType } from '@/utils/definitions'

const OrdersList = async({userId}:{userId:string | undefined}) => {
  const response:Array<MiniUserOrdersType> = await getUserOrders(userId)

  console.log("varys: ",response)
  return (
    <Box className='p-6 space-y-5'>
      {response?.map((item)=> <TabularCard item={item} key={item?._id}/>)}
 
    </Box>
  )
}

export default OrdersList
