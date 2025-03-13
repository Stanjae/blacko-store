'use client'
import React from 'react'
import { Button, Grid2, Paper, Stack, TextField} from '@mui/material'
import Image from 'next/image'

const UserProfileForm = () => {
  return (
    <Paper elevation={0} className='p-6 rounded-xl space-y-5' component={'form'}>
        <Stack>
            <Image src={''} width={70} height={70} className=' rounded-full' alt='change profile' />
        </Stack>

        <Grid2 spacing={2} container>
            <Grid2  size={6}>
                <TextField label='First Name' size='small' variant='outlined' fullWidth />
            </Grid2>
            <Grid2  size={6}>
                <TextField label='Last Name' size='small' variant='outlined' fullWidth />
            </Grid2>
            <Grid2 size={6}>
                <TextField label='Phone number' size='small' placeholder='(+234)' variant='outlined' fullWidth />
            </Grid2>
            <Grid2 size={6}>
                <TextField label='Email' size='small' variant='outlined' fullWidth disabled />
            </Grid2>
            <Grid2 size={6}>
                <TextField multiline label='Bio' size='small' variant='outlined' fullWidth />
            </Grid2>
        </Grid2>
        <Button variant='contained' type='submit' size='large' className=' rounded-xl' disableElevation>Save Changes</Button>

      </Paper>
  )
}

export default UserProfileForm