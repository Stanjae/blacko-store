'use client'
import { markNotificationsAsRead } from '@/app/lib/data'
import { ListItemIcon, ListItemText, MenuItem, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'





const CustomerLinks = ({navs, count, userId}:{userId?:string | undefined; navs:Array<{title:string, icon:React.ReactNode, url:string}>, count?:number}) => {
    console.log("countFalse,", count)
    const pathname = usePathname()

    const [amount, setAmount] = useState<number | undefined>(count)

    const handy = async () => {
        await markNotificationsAsRead(userId);
        setAmount(0)
    }
  return (
   <React.Fragment>
    {navs.map((menu, index) =>
            <Link className=' no-underline text-inherit' href={menu.url} key={index}>
                <MenuItem onClick={async()=> menu.title == "Orders" ? handy() : console.log('')} selected={pathname == menu.url} className=' py-2 pl-0'>
                <div className={`h-6 w-1 ${pathname == menu.url ? "bg-primary":"bg-transparent"} mr-5`}/>
                    <ListItemIcon>
                        {menu.icon}
                    </ListItemIcon>
                    <ListItemText >{menu.title}</ListItemText>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {menu.title == "Orders" && count ? `(${amount})`:""}
                    </Typography>
                </MenuItem>
            </Link> 
             
        )}
   </React.Fragment>
  )
}

export default CustomerLinks