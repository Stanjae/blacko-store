import { ArrowRightAlt } from '@mui/icons-material'
import { Button, Paper, Typography } from '@mui/material'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

const BannerA = ({src, subHeading, bigText, title, index}:{src: string | StaticImageData; bigText:string; subHeading:string; title:string; index:number}) => {

  return (
    <Paper elevation={0} className={` overflow-hidden relative mb-0 pb-0`}>
        <Image src={src} className={'  w-full h-[192px]'} height={'192'} width={'477'} alt={title}/>
        <div className=' -translate-y-[50%] absolute left-[32px] top-[50%] '>
        <Typography sx={{color:index == 1 ? 'white':'secondary.main'}} className=' uppercase leading-5 text-sm tracking-widest' gutterBottom variant="body1" component="p">
        {title}
        </Typography>
        <Typography sx={{color:index == 1 ? 'white':'secondary.main'}} className=' leading-[24.7px] font-medium uppercase text-xl tracking-wider' gutterBottom variant="h4" component="h4">
        {bigText}
        </Typography>
        <Typography sx={{color:index == 1 ? 'white': index == 2 ? 'secondary.main':'primary.main'}} gutterBottom className=' uppercase leading-[17.29px] text-sm font-medium tracking-wide' component={'p'} variant="body2">
        {subHeading}
        </Typography>

        <Button size='small' sx={{color:index == 1 ? 'white':'primary.main', display:'inline-block', mt:'22px'}} LinkComponent={Link} href='/store' variant='text' endIcon={<ArrowRightAlt/>}>Shop Now</Button>
        </div>
    </Paper>
  )
}

export default BannerA