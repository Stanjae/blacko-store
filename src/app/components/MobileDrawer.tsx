'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { navlinks } from '@/utils/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function AnchorTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const pathname = usePathname()

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
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navlinks.map((text, index) => (
          <Link className=' text-inherit no-underline' href={text.href} key={index}>
           <ListItem  className={`${pathname == text.href ? "bg-primary/20":""}`} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text.title} />
            </ListItemButton>
          </ListItem> 
          </Link>
          
        ))}
      </List>
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
            <MenuIcon />
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
