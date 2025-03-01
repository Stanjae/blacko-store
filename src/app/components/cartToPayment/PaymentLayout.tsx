import { Paper } from '@mui/material'
import React from 'react'
import MonnifyButton from '../monnify/MonnifyWrapper'

const PaymentLayout = () => {
  return (
    <Paper className=' flex py-10 mx-auto max-w-4xl items-center justify-center'>
      <MonnifyButton/>
    </Paper>
  )
}

export default PaymentLayout
