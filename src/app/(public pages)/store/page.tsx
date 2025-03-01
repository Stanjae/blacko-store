import ProductStore from '@/app/components/layouts/ProductStore'
import { getAllProducts } from '@/app/lib/data'
import React from 'react'

const page = async({ searchParams }: { searchParams: { sort?: string ; query?:string; category?:string; range?:string; ratings?:string} }) => {
    const newSort = (await searchParams)?.sort
    const newQuery = (await searchParams)?.query
    const newPriceRange = (await searchParams)?.range;
    const newRatings = (await searchParams)?.ratings
    const newCategory = (await searchParams)?.category

    const response =  await getAllProducts(newSort, newQuery, newPriceRange, newRatings, newCategory);
  return (
    <div>
      <ProductStore products={response}/>
    </div>
  )
}

export default page