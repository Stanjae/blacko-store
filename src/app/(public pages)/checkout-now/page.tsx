import Checkout2Layout from '@/app/components/cartToPayment/Checkout2Layout';
import axios from 'axios';
import React from 'react'

const page = async() => {
    const data = await axios.get('https://nga-states-lga.onrender.com/fetch')
  return (
    <div>
      <Checkout2Layout states={data.data}/>
    </div>
  )
}

export default page
