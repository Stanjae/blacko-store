import { banners1Array } from '@/utils/fakeDB'
import { Box, Grid2 } from '@mui/material'
import React from 'react'
import BannerA from './BannerA'

const Banners3 = () => {
  return (
    <Box className=' my-20' component={'div'}>
        <Grid2 container spacing={2} columns={3}>
            {banners1Array.map((item, index)=> (
                <Grid2 key={index} size={{xs:3, md:1}}>
                    <BannerA bigText={item.bigText} src={item.src} index={index} title={item.title} subHeading={item.subtitle}/>
                </Grid2>
            ))}
            
        </Grid2>
    </Box>
  )
}

export default Banners3