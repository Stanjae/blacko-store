import ProductStore from '@/app/components/layouts/ProductStore'
import { getAllProducts } from '@/app/lib/data'
import React from 'react'

type SearchParams = Promise<{ [key: string]: string  | undefined }>
type Params = Promise<{ slug: string }>

export async function generateMetadata(props: {
  searchParams: SearchParams; params:Params
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const query = searchParams.query
  console.log(query, params)
}

/* 

 

 
export default async function Page(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const query = searchParams.query
} */

const page = async( props: {params:Params; searchParams: SearchParams }) => {
    const searchParams = await props.searchParams
    const params = await props.params
    const newSort =  searchParams?.sort
    const newQuery = searchParams?.query
    const newPriceRange = searchParams?.range;
    const newRatings = searchParams?.ratings
    const newCategory = searchParams?.category

    console.log('ol: ', params)

    const response =  await getAllProducts(newSort, newQuery, newPriceRange, newRatings, newCategory);
  return (
    <div>
      <ProductStore products={response}/>
    </div>
  )
}

export default page