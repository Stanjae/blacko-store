import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'

const ComingSoon = () => {
  return (
    <Box component={'div'} bgcolor={'custombg.main'} className=" p-5 rounded-lg h-[310px]">
    <div className=" flex items-center justify-center">
        <div className="max-w-2xl w-full px-4">
            <Typography variant='h1' gutterBottom className="text-5xl font-bold text-center mb-8">Coming Soon!</Typography>
            <Typography color='textDisabled' component={'p'} className="text-lg text-center mb-12">Our website is under construction. We&apos;ll be back soon!
            </Typography>
            <form className="flex flex-col md:flex-row justify-center items-stretch gap-3">
                <TextField fullWidth className="grow w-full  md:w-32" type="email" placeholder="Enter your email address"/>
                <Button variant='contained' size='large' color='secondary' >Notify Me</Button>
            </form>
        </div>
    </div>
</Box>
  )
}

export default ComingSoon