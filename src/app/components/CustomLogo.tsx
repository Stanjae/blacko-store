'use client'
import Image from 'next/image'
import React from 'react'
import BgLogo from '../../../public/logo.png';
import DarkLogo from '../../../public/darkLogo.png';
import { useColorScheme } from '@mui/material';

const CustomLogo = () => {
    const { mode} = useColorScheme();
  return (
    <Image src={mode == 'light' ? BgLogo : DarkLogo}  className=' h-auto w-24 sm:w-28 ' alt='Blacko logo' priority/>
  )
}

export default CustomLogo
