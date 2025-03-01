import {Grid2 } from '@mui/material'
import React from 'react'
import HomeSectionACards from './HomeSectionACards'
import BannerA from '../../../public/banner-16.png'
import BannerB from '../../../public/banner-17.png'
import HomeSectionASlider from './Sliders/HomeSectionASlider'

const HomeSectionA = () => {
  return (
    <Grid2 container spacing={2}>
        <Grid2 size={{sm:9, xs:12}}>
            <HomeSectionASlider/>
        </Grid2>
        <Grid2 size={{sm:3, xs:12}}>
            <Grid2 container spacing={2} columns={12}>
                <Grid2 size={12}>
                   <HomeSectionACards title={'New Arrivals'} subHeading='SUMMER SALE 20% OFF' src={BannerB}/>
                </Grid2>
                <Grid2 size={12}>
                <HomeSectionACards title='Gaming 4k' src={BannerA} subHeading=' DESKTOPS & LAPTOPS'/>
                </Grid2>
            </Grid2>
        </Grid2>
    </Grid2>
  )
}

export default HomeSectionA