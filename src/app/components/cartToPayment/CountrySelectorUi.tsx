'use client'
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const MaterialUISelect = ({country, label, setCountry}:
    {label:string; country:string; setCountry:React.Dispatch<React.SetStateAction<string>>}) => {

  return (
        <FormControl size='small' fullWidth className='block w-full'>
          <InputLabel id="label-mui-country-field">Country</InputLabel>
          <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                className='w-full'
                value={country}
                label={label}
                onChange={(e) => setCountry(e.target.value)}
            >
                <MenuItem value={'Nigeria'}>Nigeria</MenuItem>
            </Select>
        </FormControl>
  );
};

export default MaterialUISelect;