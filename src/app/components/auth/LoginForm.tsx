import { signIn } from '@/auth'
import { GitHub, Google } from '@mui/icons-material'
import { Button, Divider, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const LoginForm = async() => {

  return (
    <Paper variant='outlined' className='w-full py-6 px-3 text-center'>
        <Typography gutterBottom variant='h5' className=' '>Sign In to Blacko Stores</Typography>
        <Typography variant='body1' color='textDisabled'>Welcome back, Please sign-in to continue</Typography>
        <Stack mt={2} gap={2}>
            <form className='w-full' action={async ()=> {
              "use server"
              await signIn("google", {redirectTo:'/store'})
              }}>
            <Button className='w-full' variant='outlined' color='primary' endIcon={<Google/>} type="submit">Sign-in with Google</Button>
            </form>
            <Divider>Or</Divider>
            <form className='w-full' action={async () => {
                    "use server"
                    await signIn("github", {redirectTo:'/store'})
                }}
                >
             <Button className='w-full' variant='outlined' color='info' endIcon={<GitHub/>} type="submit">Sign-in with GitHub</Button>
            </form>
        </Stack>
    </Paper>
  )
}

export default LoginForm
