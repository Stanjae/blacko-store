import { Box, Button, Grid2, Typography } from '@mui/material'
import React from 'react'

const BannerB = () => {
  return ( 
    <Grid2 spacing={{sm:2, xs:3}} component={'div'} justifyContent={'center'} alignItems={'center'} className=' p-8 long-banner bg-cover' container >
        <Grid2 bgcolor={'pink'} size="grow"/>
        <Grid2 size={{sm:8, xs:12}}>
            <Box sx={{textAlign:'center'}}>
                <Typography variant='h3' className=' text-4xl font-bold '>GIFT <Typography fontSize={'inherit'} component={'span'} color='primary'>50% OFF</Typography> PERFECT STYLES</Typography>
                <Typography variant='body2' >Only until the end of this week. Terms and conditions apply</Typography>
            </Box>
        </Grid2>
        <Grid2 textAlign={{sm:'left', xs:'center'}} justifyContent={'center'} size={{sm:"grow", xs:12}}>
            <Button size='large' className=' rounded-xl' variant='contained' sx={{bgcolor:'custombg.main', color:'secondary.main'}}>Discover Now</Button>
        </Grid2>
    </Grid2>
  )
}

export default BannerB