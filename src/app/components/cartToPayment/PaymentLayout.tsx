import { Paper } from '@mui/material'
import React from 'react'
import MonnifyButton from '../monnify/MonnifyWrapper'
import { auth } from '@/auth'

const PaymentLayout = async() => {
  const session = await auth()
  return (
    <Paper className=' flex py-10 mx-auto max-w-4xl items-center justify-center'>
      <MonnifyButton uid={session?.user?.id}/>
    </Paper>
  )
}

export default PaymentLayout
