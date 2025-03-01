import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const FinalReductionCard = ({item, index}:{item:{title:string; bigText:string, className:string; subtitle:string; price:string}; index:number}) => {
  return (
    <Box component={'div'} sx={{color:index == 1 ? 'white':'secondary.main'}} className={` ${item.className} bg-cover rounded-xl px-8 py-12`}>
        <div>
            <Typography gutterBottom  className=' text-[17px] leading-[25.5px]'>{item.title}</Typography>
            <Typography gutterBottom className=' text-[27px] font-medium leading=[40.5px]' variant='h3'>{item.bigText}</Typography>
            <Divider sx={{borderColor:index == 1 ? 'white':'secondary.main'}} className=' w-16 border-2'/>
            <Typography gutterBottom>{item.subtitle} <Typography className=' text-[21px] font-medium leading-[31.5px]' component={'span'}>{item.price}</Typography></Typography>
        </div>

    </Box>
  )
}

export default FinalReductionCard