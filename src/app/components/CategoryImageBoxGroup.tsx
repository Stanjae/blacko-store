'use client'
import { Button, Card, CardActionArea, Grid2, styled } from '@mui/material'
import React from 'react'
import Toys from '../../../public/toys.webp'
import Furniture from '../../../public/furniture.webp';
import Fashion from '../../../public/fashion.webp';
import Sports from '../../../public/sports.webp';
import Camera from '../../../public/camera.webp';
import Gaming from '../../../public/gaming.webp'
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

const imageArray = [
    {url:'/search?q=toys', title: 'Toys', image:Toys},
    {url:'/search?q=fashion', title: 'Fashion', image:Fashion},
    {url:'/search?q=sports', title: 'Sports', image:Sports},
    {url:'/search?q=camera', title: 'Camera', image:Camera},
    {url:'/search?q=gaming', title: 'Gaming', image:Gaming},
    {url:'/search?q=furniture', title: 'Furniture', image:Furniture},
]

const CustomBtn = styled(Button)(({ theme }) => [
    {
      color: theme.palette.secondary.main,
      backgroundColor: theme.palette.paper.main,
      textDecoration:'none',
      fontSize:'14px',
      borderRadius:'12px',
      fontWeight:'500',
      '&:hover': {
        color: theme.palette.common.white,
        backgroundColor: theme.palette.secondary.main,
      },

    },

    theme.applyStyles('dark', {
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.secondary.dark,
      },
    }),
  ]);

const ImageBox =({url, title, image}:{url:string; title:string; image:StaticImageData})=>{
    return(
        <Card elevation={0} >
            <Image className=' hover:scale-125 transition-all duration-500 object-cover w-full' src={image} alt={title} width={226} height={232}/>
            <CardActionArea className='px-3 pb-2'>
                <CustomBtn  className=' w-full' size='large' LinkComponent={Link} href={url}>{title}</CustomBtn>
            </CardActionArea>
            
        </Card>
    )
}
const CategoryImageBoxGroup = () => {
  return (
    <Grid2 container columns={12} spacing={2} justifyContent={'center'}>
        {imageArray.map((item, index)=> (
            <Grid2 size={{sm:2, xs:6}} key={index}>
                <ImageBox url={item.url} title={item.title} image={item.image}/>
            </Grid2>
        ))}
        
    </Grid2>
  )
}

export default CategoryImageBoxGroup