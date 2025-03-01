
import { Button, Paper, Typography } from '@mui/material'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react'
import {ArrowRightAlt} from '@mui/icons-material';
import Link from 'next/link';

const HomeSectionACards = ({src, title, subHeading}:{src: string | StaticImport; title:string; subHeading:string}) => {

  return (
    <Paper elevation={0} square={false} className=' relative mb-0 pb-0'>
        <Image src={src} className={' z-0 max-w-full h-[240px]'} height={'240'} width={'358'}
        alt="green iguana"/>
         <div className=' -translate-x-[75%] -translate-y-[50%] absolute left-[50%] top-[50%] '>
          <Typography color='secondary' className=' uppercase leading-5 text-sm tracking-widest' gutterBottom variant="body1" component="p">
           {title}
          </Typography>
          <Typography gutterBottom className=' uppercase text-xl font-medium tracking-wider' variant="h1">
           {subHeading}
          </Typography>

          <Button size='small' LinkComponent={Link} href='/store' variant='text' endIcon={<ArrowRightAlt/>}>Shop Now</Button>
        </div>
    </Paper>
  )
}

export default HomeSectionACards