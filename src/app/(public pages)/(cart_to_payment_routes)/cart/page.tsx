import React from 'react'
import axios from 'axios'
import CartLayout from '@/app/components/cartToPayment/CartLayout'

const page = async() => {
    const data = await axios.get('https://nga-states-lga.onrender.com/fetch')
  return (
    <div>
        <CartLayout states={data.data} />
    </div>
  )
}

export default page