import UserProfileForm from '@/app/components/customer/UserProfileForm'
import { Person } from '@mui/icons-material'
import { Button, IconButton, Stack,  Typography } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <section className=' space-y-6'>
      <Stack gap={2} direction={'row'}>
        <IconButton size='medium'  disabled disableRipple className=' bg-gray-100 rounded-lg text-primary'><Person/></IconButton>
        <Typography variant='h2' className=' font-semibold capitalize text-[25px] leading-[37.5px]'>Edit profile</Typography>
        <Button size='large' LinkComponent={Link} href='/customer/edit-profile' disableElevation className=' px-6 rounded-lg bg-primary/20 ml-auto'>Back to Profile</Button>
      </Stack>

      <UserProfileForm/>
    </section>
  )
}

export default page