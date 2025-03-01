'use client'
import * as React from 'react';
import Slider from '@mui/material/Slider';
import { Stack, TextField, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';

function valuetext(value: number) {
  return `$ ${value}`;
}

export default function RangeSlider() {
    const [value, setValue] = React.useState<number[]>([20, 4000]);
    const searchParams = useSearchParams();
    const { replace } = useRouter();

  const handleChange = (event: Event, newValue: number | number[]) => {
    const fixedValue = newValue as number[]
    setValue(fixedValue);
    const params = new URLSearchParams(searchParams);
    if (newValue) {
      params.set('range', fixedValue.toString());
      //params.set('gt', fixedValue[1].toString());
    } else {
      params.delete('range');
      //params.delete('lt');
    }
    replace(`/store?${params.toString()}`);
  };

  React.useEffect(()=>{
    const yuri = ()=>{
      const searchQueryValue = searchParams.get("range")
      if(!searchQueryValue) return;
      const params = new URLSearchParams(searchParams);
      params.set('range', value.toString());
      replace(`/store?${params.toString()}`);
    }
    yuri()
  },[value])

  React.useEffect(()=>{
    const yuri = ()=>{
      const searchQueryValue = searchParams.get("range")
      if(!searchQueryValue) return;
      const numberArray = searchQueryValue?.split(",").map((item)=> Number(item));
      setValue(numberArray)
    }
    yuri()
  },[])

  return (
    <div className=' p-2'>
        <Typography gutterBottom variant='body2'>Price Range</Typography>
        <Slider
            getAriaLabel={valuetext}
            min={0} max={5000}
            value={value}
            size='small'
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            valueLabelFormat={valuetext}
            aria-labelledby="non-linear-slider"
        />
        <Stack gap={2} direction={'row'}>
            <TextField onChange={(e)=> setValue(prev => ([Number(e.target.value), prev[1]]))} value={value[0]} type='number' size='medium' label="" variant="outlined" />
            <TextField value={value[1]} type='number' size='medium' label="" variant="outlined" />
        </Stack>
    </div>
  );
}
