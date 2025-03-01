
import ProductDetailLayout from '@/app/components/layouts/ProductDetailLayout'
import { getProductBySlug } from '@/app/lib/data'
import React from 'react'



const page = async({params}:{params:Promise<{ slug: string }>}) => {
  const slug = (await params).slug
  const product = await getProductBySlug(slug)
  return (
    <div>
      <ProductDetailLayout product={product}/>
    </div>
)}


export default page