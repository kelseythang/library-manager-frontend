import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

function NavBar() {
  // defines active link style
  const navBarStyle = {
    '&.active': {
      color: 'primary.main',
      fontWeight: 'bold' 
    }
  }

  return (
    <Box sx={{ typography: 'body1' }}>
      <Stack spacing={2} py={2} divider={<Divider orientation='horizontal' flexItem />}>
        <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/'>HOME</Link>
        <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/books'>BOOKS</Link>
        <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/checkouts'>CHECKOUTS</Link>
        <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/members'>MEMBERS</Link>
      </Stack>
    </Box>
  )
}

export default NavBar;