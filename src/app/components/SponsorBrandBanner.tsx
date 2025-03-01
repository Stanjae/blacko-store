import { sponsorBrands } from '@/utils/fakeDB'
import { Box, Paper, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const SponsorBrandBanner = () => {
 
  return (
    <Box>
        <Typography gutterBottom className=' mb-6 text-xl font-semibold' variant='h3'>Featured Brands</Typography>
        <Paper elevation={0} sx={{p:'32px'}}>
            <Stack spacing={{sm:'177px', xs:10}}  direction={{sm:'row', xs:'column'}} justifyContent={'center'} alignItems={'center'}>
                {sponsorBrands.map((item, index)=>( <Image className=' grayscale' width={110} height={50} key={index} alt="brands"  src={item}/>))}
            </Stack>
        </Paper>
    </Box>
    
  )
}

export default SponsorBrandBanner