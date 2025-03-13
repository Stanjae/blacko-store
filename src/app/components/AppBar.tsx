'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AnchorTemporaryDrawer from './MobileDrawer';
import CustomSearchBar from './CustomSearchBar';
import { useCounterStore } from '../providers/storeProvider';
import AddToCartNavBar from './AddToCartNavBar';
import CustomLogo from './CustomLogo';
import { alpha, Button } from '@mui/material';
import Link from 'next/link';
import { signOut } from "next-auth/react"
import type { Session } from 'next-auth';



export default function PrimarySearchAppBar({session}:{session: Session | null}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

   const {getExistingCart } = useCounterStore((state) => state);
  
   React.useEffect(() => {
    getExistingCart();
  }, []);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link className=' text-inherit no-underline' href={'/customer'}><MenuItem  onClick={handleMenuClose}>Profile</MenuItem></Link>
      <Link className=' text-inherit no-underline' href={'/customer/orders'}><MenuItem  onClick={handleMenuClose}>My Orders</MenuItem></Link>
      <MenuItem sx={{bgcolor:alpha('#E3364E',0.1), color:"primary.main", ":hover":{bgcolor:alpha('#E3364E',0.2)}}} onClick={()=> signOut()}>SignOut</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className=' sm:px-4 sm:py-4' color='custombg' position="static">
          <Toolbar className=' justify-between'>
            <AnchorTemporaryDrawer/>
            <Typography
              noWrap
              component="a"
              href='/'
              sx={{ display: 'block' }}
            >
              <CustomLogo/>
            </Typography>
            <React.Suspense>
              <CustomSearchBar/>
            </React.Suspense>
            <Box sx={{ display: 'flex' }}>
              <AddToCartNavBar/>
              {session?.user ?
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              :
              <Button LinkComponent={Link} href='/auth/sign-in'>Login</Button>
              }
            
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>

  );
}
