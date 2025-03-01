'use client'
import { Box, Grid2, Stack, Tab, Typography } from '@mui/material'
import React from 'react'
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProductCard from './ProductCard';
import { ProductStoreType } from '@/utils/definitions';

const SelectedProductsSection = ({response}:{response:ProductStoreType[]}) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

  return (
    <Box component={'div'} className=' my-20'>
        <TabContext value={value}>
        <Stack direction={{sm:'row', xs:'column'}} spacing={3} justifyContent={'space-between'}>
            <Box>
                <Typography variant='h3' className=' text-xl font-semibold'>Selected Products</Typography>
                <Typography variant='body2'>All our new arrivals in a exclusive brand selection</Typography>
            </Box>
            <Box>
                <TabList variant='scrollable' scrollButtons={'auto'} onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Newest Arrivals" value="1" />
                    <Tab label="Best Seller" value="2" />
                    <Tab label="Most Popular" value="3" />
                </TabList>
            </Box>
        </Stack>
        
        <Box>
            <TabPanel value={'1'}>
                <Grid2  columns={5} justifyContent={'center'} spacing={2} container>
                {response && response?.map((item, index) => (
                    <Grid2 size={{sm:1, xs:5}} key={index}>
                        <ProductCard product={item}/>
                    </Grid2>
                ))}
                </Grid2>
            </TabPanel>
        </Box>
        
        </TabContext>
    </Box>
  )
}

export default SelectedProductsSection