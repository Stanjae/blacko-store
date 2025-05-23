import ComingSoon from '@/app/components/ComingSoon'
import { LocationOn } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

const page = () => {
  return (
    <section className=' space-y-6'>
      <Stack gap={2} direction={'row'}>
        <IconButton size='medium'  disabled disableRipple className=' bg-gray-100 rounded-lg text-primary'><LocationOn/></IconButton>
        <Typography variant='h2' className=' font-semibold capitalize text-[25px] leading-[37.5px]'>My Addresses</Typography>
      </Stack>
      <ComingSoon/>
      </section>
  )
}

export default page