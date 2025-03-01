import { FinalReductionArray } from '@/utils/fakeDB'
import { Grid2 } from '@mui/material'
import React from 'react'
import FinalReductionCard from './FinalReductionCard'

const FinalReductionBanners = () => {
  return (
    <Grid2 container my={'82'}  spacing={3} columns={{xs:1, md:2}}>
        {FinalReductionArray.map((item, index)=> (
            <Grid2 size={{md:1}} key={index}>
                <FinalReductionCard index={index} item={item}/>
            </Grid2>
        ))}
        
    </Grid2>
  )
}

export default FinalReductionBanners