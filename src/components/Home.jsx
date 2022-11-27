import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Home({ theme, colorMode }) {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Box mt={2} ml={4} mr={4}>
      <Grid container spacing={2}>
        <Grid xs={8}>
          <Typography variant='h1'>Test</Typography>
        </Grid>
        {/* right-aligns light/dark mode toggle */}
        <Grid container justifyContent='flex-end' xs={4}>
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'light' ? (<LightModeIcon />) : (<DarkModeIcon />) }
          </IconButton>
        </Grid>
        <Grid xs={4}>
          <Item>xs=4</Item>
        </Grid>
        <Grid xs={8}>
          <Item>xs=8</Item>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home;