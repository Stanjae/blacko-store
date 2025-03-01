import { Divider, Paper, Typography } from '@mui/material'
import React, { ReactElement } from 'react'
import {AccountBalanceWalletOutlined, LocalShipping, Savings, TimerOutlined} from '@mui/icons-material';

const arrayIconContent = [
    {top:'Fast delivery', bottom:'Starts from $10', icon:<LocalShipping sx={{fontSize:'40px'}}/>},
    {top:'Money Guarantee', bottom:'7 days Back', icon:<Savings sx={{fontSize:'40px'}}/>},
    {top:'365 Days', bottom:'For Free Return', icon:<TimerOutlined sx={{fontSize:'40px'}}/>},
    {top:'Payment', bottom:'Secure System', icon:<AccountBalanceWalletOutlined sx={{fontSize:'40px'}}/>}
]

const IconBox =({icon, top, bottom}:{icon:ReactElement; top:string; bottom:string})=>(
    <div className=' w-full flex gap-4 justify-start sm:justify-center items-center'>
        {icon}
        <div>
            <Typography className=' text-lg font-medium leading-6'>{top}</Typography>
            <Typography color='textDisabled' className=' text-sm font-medium'>{bottom}</Typography>
        </div>
    </div>
)
const IconBoxGroup = () => {
  return (
    <Paper elevation={0} className=' py-8 my-10 flex flex-col md:flex-row justify-center items-center' sx={{bgcolor:'custombg.main', color:'secondary.main'}}>
        {arrayIconContent.map((item, index) =>( 
            <React.Fragment key={index}>
            <IconBox icon={item.icon} top={item.top} bottom={item.bottom} />
            <Divider orientation="vertical" variant="middle" flexItem />
            </React.Fragment>
            ))}
    </Paper>
  )
}

export default IconBoxGroup