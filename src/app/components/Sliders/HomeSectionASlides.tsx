import { Button, Typography } from '@mui/material'
import Link from 'next/link';
import React from 'react'

const HomeSectionASlides = ({BgClass, title, subtitle, redText, bigText, excerpt}:{BgClass:string; title:string; subtitle:string; bigText:string; 
    excerpt:string; redText:string}) => {
  return (
    <div className={`${BgClass} py-[117px] h-[100%] bg-cover`}>
        <div className=' sm:pl-20  text-center sm:text-left'>
            <Typography color='secondary' className=' text-3xl font-medium leading-8 uppercase' gutterBottom variant='h4' component={'h4'}>{title}</Typography>
            <Typography color='secondary' className=' text-6xl font-semibold leading-[60px] uppercase' gutterBottom variant='h4' component={'h4'}>{bigText}</Typography>
            <Typography color='secondary' className=' text-3xl font-medium leading-[30px] uppercase' gutterBottom variant='body1' component={'p'}>{subtitle}
                <Typography className=' text-3xl' component={'span'} color='primary' >{redText}</Typography>
            </Typography>
            <Typography color='secondary' className=' leading-6 font-medium mb-8' gutterBottom variant='body2' component={'p'}>{excerpt}</Typography>
            <Button LinkComponent={Link} href='/store' color='secondary' variant='contained' size='large'>Shop Now</Button>
        </div>
    </div>
  )
}

export default HomeSectionASlides