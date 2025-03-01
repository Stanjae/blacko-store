'use client'
import { Stack, styled} from '@mui/material'
import React from 'react'
import ItemsMenuBar from './ItemsMenuBar'
import { navlinks } from '@/utils/navigation'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const CustomLink = styled(Link)(({ theme }) => [
    {
      //color: theme.palette.secondary.main,
      textDecoration:'none',
      fontSize:'14px',
      fontWeight:'500',

    },

    theme.applyStyles('dark', {
      color: theme.palette.secondary.main,
      '&:hover': {
        color: theme.palette.secondary.dark,
      },
    }),
  ]);

const ExtraAppBar = () => {
    const pathname = usePathname()
  return (
    <Stack bgcolor={'custombg.main'} direction={'row'} className='sm:px-10 hidden sm:flex items-center py-3 justify-between'>
        <ItemsMenuBar/>
        <div className=' flex gap-x-8 items-center'>
            {navlinks.map(item => (
                <CustomLink sx={{color: pathname == item.href ? 'primary.main':'secondary.main'}} href={item?.href} key={item?.href}>{item?.title}</CustomLink>
            ))}
        </div>
    </Stack>
  )
}

export default ExtraAppBar