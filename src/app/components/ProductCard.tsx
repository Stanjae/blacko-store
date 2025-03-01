import { client } from '@/sanity/client'
import { ProductStoreType} from '@/utils/definitions'
import { FavoriteBorderOutlined, Visibility } from '@mui/icons-material'
import { Card, CardActions, CardContent, Chip, IconButton, Rating, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import { removeSlugs } from '@/utils/utilityFn'
import AddtoCartBtn from './AddtoCartBtn'

const builder = imageUrlBuilder(client)

type SourceType =  {
  asset: {
      _ref: string;
  };
}

export function urlFor(source:SourceType) {
  return builder.image(source)
}

/*  , , , ,  */

const ProductCard = ({product}:{product:ProductStoreType}) => {
  const numberOfReviews = product?.rating?.length || 1
  const newRating = product.rating?.reduce((totalSum, currentSum)=> ( totalSum + currentSum),0) || 1

  const averageRating = Math.floor(newRating / numberOfReviews)

  const newStatus = product?.status == 'deals-for-today' ? 'bg-[#e85e71]': product?.status == 'mega-offers' ?
   'bg-blue-500' : product?.status == 'weekend-sales' ? 'bg-green-500' : product?.status == 'flash-sales' ? 'bg-purple-500' : 
   product?.status == 'shipped-from-abroad' ? 'bg-[#555c6a]/50' : 'bg-gray-500'
  return (
    <Card className=' candace relative' elevation={0}>
      {product.status && <Chip className={` ${newStatus} text-white capitalize z-30 absolute left-2 top-2`} size='small' label={removeSlugs(product?.status)}/>}
      <Stack className=' candace-child z-20 absolute -right-10 top-0' direction={'column'}>
        <IconButton size='small'><Visibility color='disabled'/></IconButton>
        <IconButton size='small'><FavoriteBorderOutlined color='disabled'/></IconButton>
      </Stack>
        <Image className='hover:scale-110 transition-all duration-500 object-contain w-full h-auto' src={urlFor(product?.thumbnail).quality(100).width(1250).height(1250).url()} width={278} height={278} alt={product?.title}/>
        <CardContent className=' text-center'>
            <Typography color='textPrimary' href={`/product/${product?.slug?.current}`} component={Link} className='text-sm no-underline font-medium leading-[21px]'>{product?.title?.substring(0,25) + "..."}</Typography>
            <Typography color='primary' className=' text-sm leading-[21px] font-semibold py-1 '>{'$' + product.basePrice}</Typography>
            <div className=' flex justify-center items-center gap-2'>
                <Rating size='small' name="read-only" value={averageRating} readOnly />
                <Typography color='textDisabled' className=' text-xs' component={'span'}>({numberOfReviews})</Typography>
            </div>
            
        </CardContent>
        <CardActions className='p-2'>
            <AddtoCartBtn item={product}/>
        </CardActions>
    </Card>
  )
}

export default ProductCard