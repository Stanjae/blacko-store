import PaymentLayout from '@/app/components/cartToPayment/PaymentLayout'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div>
      <Suspense>
        <PaymentLayout/>
      </Suspense>  
    </div>
  )
}

export default page
