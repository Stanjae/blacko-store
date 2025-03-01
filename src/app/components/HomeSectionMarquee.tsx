import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import Marquee from 'react-fast-marquee'

const HomeSectionMarquee = () => {
  return (
    <Box sx={{display:'flex', flexDirection:{sm:'row', xs:'column'}, p:0, border:'none', alignItems:'center', mt:'82px'}} bgcolor={'paper.main'}>
        <Typography component={'div'} bgcolor={'paper.main'} variant='h3' className=' text-3xl font-bold uppercase w-full sm:w-[428px] p-6 '>Black Friday Sell</Typography>
      {/* Pay only for your loving electronics */}
      <Box component={'div'} className='mask01 rounded-lg ' flexGrow={1} bgcolor={'secondary.main'} pr={'2px'} p={'3px'}>
        <div className=' flex flex-col sm:flex-row gap-3 items-center w-full border-dashed border rounded-lg p-4 border-white'>
            <Marquee style={{ width:'90%' }}>
                <Typography className=' italic text-[28px] tracking-wider uppercase font-bold leading-[42px] text-white'>Pay only for your loving electronics</Typography>
            </Marquee>
            <Button sx={{bgcolor:'paper.main', color:'secondary.main', flexGrow:1}} size='medium'> Shop Now</Button>
        </div>
      </Box>
        
    </Box>
  )
}

export default HomeSectionMarquee