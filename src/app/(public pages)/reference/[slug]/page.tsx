import { ConfettiBox } from '@/app/components/ConfettiBox';
import { getOrderReference } from '@/app/lib/data';
import { CartProductType, OrderReferenceType } from '@/utils/definitions';
import { CheckCircle, ShoppingCartCheckout } from '@mui/icons-material';
import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Paper, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react'

const page = async({params}:{params:Promise<{ slug: string }>}) => {
    const slug = (await params).slug;
    const response:OrderReferenceType = await getOrderReference(slug)

    const products:CartProductType[] = JSON.parse(response.products)
  return (
    <div>
      <ConfettiBox/>
      <Paper className=' max-w-5xl mx-auto p-10 '>
        <Typography variant='h4' color='primary' className=' font-semibold text-center'>Your Order has been Placed</Typography>
        <Typography gutterBottom className='text-center' variant='h5'>Tracking ID: <Typography variant='h6' component={'span'} className='inherit font-semibold'>{response?.reference_id}</Typography></Typography>
        <Typography component={'div'}  className='text-center justify-center flex items-center' variant='h6'>Payment Status: <CheckCircle color='success'/></Typography>
        <Divider/>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {products.map(product => (
            <ListItem key={product._id}>
                <ListItemAvatar>
                <Avatar src={product?.thumbnail}/>
                </ListItemAvatar>
                <ListItemText primary={product.title} secondary={"Qty:"+ product.quantity} />
                <Typography color='success'>&#8358;{product?.price}</Typography>
            </ListItem>
            ))}        
      </List>
      <Stack justifyContent={'center'} spacing={2} direction={'row'}>
      <Button LinkComponent={Link} href='/' variant='outlined' color='secondary' endIcon={<ShoppingCartCheckout/>}>Go to Home</Button>
        <Button LinkComponent={Link} href='/store' variant='contained' color='secondary' endIcon={<ShoppingCartCheckout/>}>Continue Shopping</Button>
      </Stack>
      </Paper>
    </div>
  )
}

export default page
