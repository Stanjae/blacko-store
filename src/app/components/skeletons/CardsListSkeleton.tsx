import { Skeleton } from '@mui/material'
import React from 'react'

const CardsListSkeleton = ({amount}:{amount:number}) => {
  return (
    <div className=' flex gap-4 items-center'>
        {Array(amount).fill("_").map((i,j)=>(
            <Skeleton key={j} variant="rounded" width={134} height={102} />
        ))}
      
    </div>
  )
}

export default CardsListSkeleton
