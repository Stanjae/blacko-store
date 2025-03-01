'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { useCounterStore } from '../providers/storeProvider';
import { Badge, Button, IconButton, Stack, Typography } from '@mui/material';
import {Close, ShoppingBag, ShoppingBagOutlined } from '@mui/icons-material';
import AddToCartItem from './AddToCartItem';
import Link from 'next/link';

export default function AddToCartNavBar() {
  const [open, setOpen] = React.useState(false);

  const {newCart, totalPrice, totalCount} = useCounterStore((state) => state);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const count = totalCount()

  const DrawerList = (
    <Box component={'div'} className=' w-96 relative' role="presentation">
        <Stack px={2} py={2} justifyContent={'space-between'} direction={'row'}>
            <Typography variant='h6' component={'div'} className=' flex items-center'>
                <ShoppingBag/>
                {count == 0 ? "No Items": count ? `${count} item` : `${count} Items`}
            </Typography>
            <IconButton onClick={toggleDrawer(false)}><Close/></IconButton>
        </Stack>
        <Divider/>
        <List>
            {newCart.map((text, index) => (
            <ListItem key={index}>
                <AddToCartItem item={text}/>
            </ListItem>
            ))}
        </List>
        
    </Box>
  );

  return (
    <div>
        <IconButton onClick={toggleDrawer(true)} size="large" aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={count} color="error">
            <ShoppingBagOutlined/>
            </Badge>
        </IconButton>
      <Drawer open={open} className=' relative' anchor='right' onClose={toggleDrawer(false)}>
        {DrawerList}
        <Stack px={2} gap={1.5} className=' bg-white z-40 absolute bottom-3 w-full'>
           {count != 0  && <Button LinkComponent={Link} href='/checkout-now' variant='contained'>CheckOut Now ({"$" + totalPrice().toFixed(2)})</Button>}
            <Button LinkComponent={Link} href='/cart' variant='outlined'>View Cart</Button>
        </Stack>
      </Drawer>
    </div>
  );
}
