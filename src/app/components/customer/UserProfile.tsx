import { getUserDetails } from '@/app/lib/data'
import { SanityUserProfile} from '@/utils/definitions'
import { Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

const UserProfile = async({id}:{id:string | undefined}) => {
    const response:SanityUserProfile = await getUserDetails(id)
    const fullName = response?.fullname?.split(" ")
  return (
    <Paper elevation={0} className=' px-8 py-5'>
        <Stack justifyContent={'space-between'} spacing={{md:1, xs:3}} direction={{md:'row', xs:'column'}}>
            <Box>
                <Typography color='textDisabled' gutterBottom className=' text-sm leading-[21px]'>First Name</Typography>
                <Typography className=' leading-[21px] text-sm'>{fullName?.at(0)}</Typography>
            </Box>

            <Box>
                <Typography color='textDisabled' gutterBottom className=' text-sm leading-[21px]'>Last Name</Typography>
                <Typography className=' leading-[21px] text-sm'>{fullName?.at(1)}</Typography>
            </Box>

            <Box>
                <Typography color='textDisabled' gutterBottom className=' text-sm leading-[21px]'>Email</Typography>
                <Typography className=' leading-[21px] text-sm'>{response?.email}</Typography>
            </Box>

            <Box>
                <Typography color='textDisabled' gutterBottom className=' text-sm leading-[21px]'>Phone</Typography>
                <Typography className=' leading-[21px] text-sm'>{response?.phoneNumber}</Typography>
            </Box>

            <Box>
                <Typography color='textDisabled' gutterBottom className=' text-sm leading-[21px]'>Role</Typography>
                <Typography className=' leading-[21px] text-sm'>{response?.role}</Typography>
            </Box>
        </Stack>
    </Paper>
  )
}

export default UserProfile