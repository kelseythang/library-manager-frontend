import React, { useState } from 'react'
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, useMode } from '../contexts/ThemeContext';
import '../index.css';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Home from './Home';
import NavBar from './NavBar';
import BookList from './BookList';
import MemberList from './MemberList';
import { SnackbarContextProvider } from '../contexts/SnackbarContext';

function App() {
  const [theme, colorMode] = useMode();

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={responsiveFontSizes(theme)}>
        <SnackbarContextProvider>
          <CssBaseline />
          <Box mt={2} ml={4} mr={4}>
            {/* grid layout for overall website */}
            <Grid container spacing={2}>
              {/* website title - top left */}
              <Grid xs={8}>
                <Typography variant='h1' color='primary' sx={{ fontWeight: 'bold' }}>LIBRARY MANAGER</Typography>
              </Grid>
              {/* right-aligns light/dark mode toggle - top right */}
              <Grid container justifyContent='flex-end' xs={4}>
                <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === 'light' ? (<LightModeIcon />) : (<DarkModeIcon />) }
                </IconButton>
              </Grid>
              {/* navigation bar - bottom left with paper styling */}
              <Grid xs={2}>
                <Item sx={{ textAlign: 'center' }}>
                  <NavBar />
                </Item>
              </Grid>
              {/* displayed routes - bottom right with paper styling */}
              <Grid xs={10}>
                <Item>
                  <Routes>
                    <Route path='/' element={<Home theme={theme} colorMode={colorMode} />} />
                    <Route path='/books' element={<BookList />} />
                    <Route path='/members' element={<MemberList />} />
                  </Routes>
                </Item>
              </Grid>
            </Grid>
          </Box>
        </SnackbarContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App