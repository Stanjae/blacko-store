'use client'
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomeSectionASlides from './HomeSectionASlides';


const HomeSectionASlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true
      };
  return (
    <div className=' slider-container h-full'>
        <Slider {...settings}>
            <HomeSectionASlides excerpt='Get Free Shipping on orders over $99.00' title='Lifestyle collection' subtitle='sales up to ' redText='30% off' bigText='Men' BgClass='slideA-Bg'/>
            <HomeSectionASlides excerpt='Get Free Shipping on orders over $99.00' title='Lifestyle collection' subtitle='sales up to ' redText='35% off' bigText='Women' BgClass='slideB-Bg'/>
      </Slider>
    </div>
  )
}

export default HomeSectionASlider