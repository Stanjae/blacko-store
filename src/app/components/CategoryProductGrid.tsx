import { ArrowRightAlt } from '@mui/icons-material';
import { Button, Card, CardActions, CardContent, Grid2, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { Suspense } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';
import { getCustomCategories } from '../lib/data';
import { ProductStoreType } from '@/utils/definitions';
import LayoutSkeleton from './layouts/LayoutSkeleton';

const CategoryProductGrid = async({title, categoryList, fnParams}:
    {title:string; categoryList:{title:string; value:string}[] | undefined; fnParams:{category1:string; category2:string; title:string}}) => {

        const response:ProductStoreType[] = await getCustomCategories(fnParams?.category1, fnParams?.title, fnParams?.category2, 4)
  return (
    <Grid2 container my={'82px'} spacing={3} columns={6}>
        <Grid2 size={{sm:2, xs:6}}>
            <Card elevation={0} className=' px-8 py-5'>
                <CardContent>
                    <Typography className='text-xl font-semibold' variant='h3' component={'h3'}>{title}</Typography>
                    <List disablePadding dense>
                        {categoryList?.map((item, index) => (
                            <ListItem className=' duration-500 transition-colors text-gray-950 no-underline hover:text-gray-600' href={`store?category=${item?.value}`} component={Link}  disableGutters key={index}>
                                <ListItemText primary={item.title}/>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
                <CardActions>
                    <Button LinkComponent={Link} href={`store?category=electronics`} endIcon={<ArrowRightAlt/>} color='secondary' variant='text'>Browse All</Button>
                </CardActions>
            </Card>
        </Grid2>
        <Grid2 size={{sm:4, xs:6}}>
            <Suspense fallback={<LayoutSkeleton arrayCount={4} gridColumn={8} gridSizeMd={2} gridSizeSm={4}/>}>
                <Grid2 spacing={2} columns={4} container>
                    {response?.map((item, index)=>(
                        <Grid2 key={index} size={{sm:1, xs:4}}><ProductCard product={item}/></Grid2>
                    ))}               
                </Grid2>
            </Suspense>
            
        </Grid2>
    </Grid2>
  )
}

export default CategoryProductGrid