
import { ListSubheader, MenuList, Paper } from '@mui/material'
import React, { Suspense } from 'react'
import CustomerLinks from './CustomerLinks'
import { CreditCardOutlined, FavoriteBorderOutlined, LocationOnOutlined, PersonOutline, ShoppingBagOutlined, SupportAgentOutlined } from '@mui/icons-material'
import { countUnreadNotifications } from '@/app/lib/data'
import CustomLoader from '../CustomLoader'

const navs = [
    {title:"Orders", url:"/customer/orders", icon:<ShoppingBagOutlined/>},
    {title:"Wishlist", url:"/customer/wishlist", icon:<FavoriteBorderOutlined/>},
    {title:"Support Ticket", url:"/customer/support-ticket", icon:<SupportAgentOutlined/>}
]

const accountNavs = [
    {title:"Profile Info", url:"/customer", icon:<PersonOutline/>},
    {title:"Addresses", url:"/customer/address", icon:<LocationOnOutlined/>},
    {title:"Payment Methods", url:"/customer/payment-method", icon:<CreditCardOutlined/>}
]


const SideNavBar = async({userId}:{userId:string | undefined}) => {
    const response  = await  countUnreadNotifications(userId)

  return (
    <Paper elevation={0} className=' space-y-2'>
        <MenuList>
            <ListSubheader className=' uppercase' component="div" id="nested-list-subheader">
            Dashboard
            </ListSubheader>
            <Suspense fallback={<CustomLoader/>}>
                <CustomerLinks userId={userId} count={response} navs={navs}/>
            </Suspense>
        </MenuList>

        <MenuList>
            <ListSubheader className=' uppercase' component="div" id="nested-list-subheader">
            Account Settings
            </ListSubheader>
            <CustomerLinks navs={accountNavs}/>
        </MenuList>
    </Paper>
  )
}

export default SideNavBar