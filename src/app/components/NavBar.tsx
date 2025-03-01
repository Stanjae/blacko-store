import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Stack, Typography } from '@mui/material'
import React from 'react'
import { Add, Facebook, Instagram, Twitter } from '@mui/icons-material';
import PrimarySearchAppBar from './AppBar';
import ExtraAppBar from './ExtraAppBar';
import { ColorToogle } from './ColorToogle';
import { Session } from 'next-auth';

const MobileStack = ()=>(
  <Accordion sx={{bgcolor:'secondary.main'}} className=' sm:hidden block'>
        <AccordionSummary
          expandIcon={<Add sx={{color:'white'}} />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div className=' gap-x-2 flex items-center'>
                <Chip size='small' label="Hot" color="primary" />
                <Typography variant='body2' className=' text-xs text-white'>Free Express Shipping</Typography>
            </div>
        </AccordionSummary>
        <AccordionDetails>
        <div className=' text-white gap-x-2 flex items-center'>
                <ColorToogle/>
                <Twitter fontSize='small'/>
                <Instagram fontSize='small'/>
                <Facebook fontSize='small'/>
            </div> 
        </AccordionDetails>
      </Accordion>
)

const NavBar = async({session}:{session:Session | null}) => {
  return (
    <Box >
      <MobileStack/>
        <Stack bgcolor={'secondary.main'} className=' py-2 hidden sm:flex sm:px-10' justifyContent={'space-between'}  direction={'row'}>
            <div className=' gap-x-2 flex items-center'>
                <Chip size='small' label="Hot" color="primary" />
                <Typography variant='body2' className='text-white'>Free Express Shipping</Typography>
            </div>
            <div className=' text-white gap-x-2 flex items-center'>
                <ColorToogle/>
                <Twitter fontSize='small'/>
                <Instagram fontSize='small'/>
                <Facebook fontSize='small'/>
            </div> 
        </Stack>
        <PrimarySearchAppBar session={session}/>
        <ExtraAppBar/>
    </Box>
  )
}

export default NavBar