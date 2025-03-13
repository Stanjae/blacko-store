'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { FilterList } from '@mui/icons-material';
import RangeSlider from './PriceSlider';
import RatingFilters from './RatingFilters';
import { Divider, IconButton } from '@mui/material';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function MobileFilters() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box component={'div'}  className='space-y-6 p-2'>
                <RangeSlider/>
                <Divider/>
                <RatingFilters/>
        </Box>
    </Box>
  );

  return (
    <div className=' md:hidden'>
        <React.Fragment >
          <IconButton onClick={toggleDrawer('left', true)}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 , display:{xs:'block', md:'none'}}}
          >
            <FilterList />
          </IconButton> 
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
