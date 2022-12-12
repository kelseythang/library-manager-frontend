import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';

function NavBarDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  // ----------------- Active Link Style ----------------- //
  const navBarStyle = {
    '&.active': {
      color: 'primary.main',
      fontWeight: 'bold' 
    }
  }

  return (
    <>
      <Drawer anchor='top' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box>
          <Stack alignItems='center' spacing={2} py={2} divider={<Divider orientation='horizontal' flexItem />}>
            <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/'>HOME</Link>
            <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/books'>BOOKS</Link>
            <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/checkouts'>CHECKOUTS</Link>
            <Link component={RouterLink} color='neutral.dark' underline='none' sx={navBarStyle} to='/members'>MEMBERS</Link>
          </Stack>
        </Box>
      </Drawer>
    </>
  )
}

export default NavBarDrawer;