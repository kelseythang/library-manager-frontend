import React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';

function NavBar() {
  return (
    <Box>
      <NavLink className={({ isActive }) => (isActive ? 'navactive' : '')} to='/'>HOME</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'navactive' : '')} to='/books'>BOOKS</NavLink>
      <NavLink className={({ isActive }) => (isActive ? 'navactive' : '')} to='/members'>MEMBERS</NavLink>
    </Box>
  )
}

export default NavBar;