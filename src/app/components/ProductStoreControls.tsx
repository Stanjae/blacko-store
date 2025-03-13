'use client'
import { sortbyItems } from '@/utils/navigation';
import { GridView, List } from '@mui/icons-material';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import MobileFilters from './MobileFilters';

const ProductStoreControls = ({setNewLayout, newLayout}:{newLayout:boolean; setNewLayout:React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [age, setAge] = React.useState('');
    const searchParams = useSearchParams();
    //const pathname = usePathname();
    const { replace } = useRouter();
    
      const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value as string);

        const params = new URLSearchParams(searchParams);
        if (event.target.value) {
          params.set('sort', event.target.value);
        } else {
          params.delete('sort');
        }
        replace(`/store?${params.toString()}`);
      };

      const searchQueryValue = searchParams.get("query")
  return (
    <Stack
      alignItems={"center"}
      justifyContent={"space-between"}
      direction={"row"}
    >
      {searchQueryValue && <Typography variant='h5'>Search Results for: {searchQueryValue}</Typography>}
      <Box
        component={"div"}
        className=" gap-4 w-full md:w-auto  md:ml-auto flex flex-col md:flex-row items-center"
      >
        <div className=' flex w-full md:w-auto  items-center gap-2'>
          <Typography>Sort By: </Typography>
          <FormControl className=" block grow md:w-40" size='small' >
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              className=' w-full'
              value={age}
              label="Age"
              onChange={handleChange}
            >
                {sortbyItems.map((item)=> <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>)}
            </Select>
          </FormControl>
        </div>

        <div className=" gap-2 w-full md:w-auto flex items-center">
          <Typography variant="body2">View :</Typography>
          <div className=" flex items-center">
            <IconButton onClick={()=> setNewLayout(true)} color={newLayout ? "primary":"default"} size="small">
              <GridView />
            </IconButton>
            <IconButton onClick={()=> setNewLayout(false)} color={newLayout ? "default" : "primary"} size="small">
              <List />
            </IconButton>
          </div>
          <MobileFilters/>
        </div>
      </Box>
    </Stack>
  );
}

export default ProductStoreControls