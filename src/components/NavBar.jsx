import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

function NavBar() {
  return (
    <Box>
      <Stack>
        <NavLink className={({ isActive }) => (isActive ? 'navactive' : '')} to='/'>HOME</NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'navactive' : '')} to='/books'>BOOKS</NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'navactive' : '')} to='/members'>MEMBERS</NavLink> 
      </Stack>
    </Box>
  )
}

export default NavBar;