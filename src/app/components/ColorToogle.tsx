'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import {useColorScheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
//import { useMediaQuery } from '@mui/material';

export function ColorToogle() {
  const { mode, setMode } = useColorScheme();

  //const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  if (!mode) {
    return null;
  }

  const handleChange = (event : 'light' | 'dark') => {
    setMode(event);
  };
  return (
    <Box marginRight={'20px'}>
     {mode == 'light' ? <IconButton size='small' onClick={()=> handleChange('dark')}><DarkMode color='primary'/></IconButton>
      :
     <IconButton size='small' onClick={()=> handleChange('light')}><LightMode /></IconButton>  }
    </Box>
  );
}

