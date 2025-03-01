'use client'
import React, {useEffect, useState} from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { Rating, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';



export default function RatingFilters() {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [value, setValue] = useState<string | number >(5);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const fixedValue = (event.target as HTMLInputElement).value
      setValue(fixedValue);
      const params = new URLSearchParams(searchParams);
        if (fixedValue) {
          params.set('ratings', fixedValue.toString());
        } else {
          params.delete('ratings');
        }
        replace(`/store?${params.toString()}`);
    };

    useEffect(() => {
      const params = searchParams.get('ratings') 
      if(!params) return 
      // Update the value when the search params change (e.g., after page navigation)
      setValue(Number(params) || 5);
    }, [])
  return (
    <div className=' space-y-3 p-2'>
      <Typography variant='body2' gutterBottom >Ratings</Typography>
      <RadioGroup onChange={handleChange} name="use-radio-group" value={value}>
        {[5,4,3,2,1].map((item)=>(
           <FormControlLabel key={item} value={item}  control={<Radio />} label={<Rating size='small' value={item} readOnly/>} />
        ))}
    </RadioGroup>
    </div>
    
  );
}
