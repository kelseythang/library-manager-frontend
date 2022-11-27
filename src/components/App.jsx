import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, useMode } from '../theme';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import '../index.css';

function App() {
  const [theme, colorMode] = useMode();

  const handleMode = () => {
    console.log('working')
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'light' ? (<LightModeIcon />) : (<DarkModeIcon />) }
          </IconButton>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App