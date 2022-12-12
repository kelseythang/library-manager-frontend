import React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CheckoutIcon from '@mui/icons-material/ShoppingCartCheckoutRounded';
import BookIcon from '@mui/icons-material/MenuBookRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import PageTitle from './PageTitle';
import { useNavigate } from 'react-router-dom';

function Home({ checkouts, books, members }) {
  const navigate = useNavigate();

  const elementHover = { '&:hover': { color: 'primary.main' } };

  return (
    <Box mx={3} mb={3}>
      <PageTitle title='Library Dashboard' />
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        spacing={{ xs: 2, sm: 2, md: 4 }} 
        divider={<Divider orientation='horizontal' flexItem />} // divider for mobile view
        justifyContent='space-evenly'
      >
        <Stack alignItems='center' sx={elementHover} onClick={() => navigate('/checkouts')}>
          <Typography variant='h4'>Checkouts</Typography>
          <CheckoutIcon sx={{ fontSize: 100 }} />
          <Typography variant='h4'>{checkouts}</Typography>
        </Stack>
        <Stack alignItems='center' sx={elementHover} onClick={() => navigate('/books')}>
          <Typography variant='h4'>Books</Typography>
          <BookIcon sx={{ fontSize: 100 }} />
          <Typography variant='h4'>{books}</Typography>
        </Stack>
        <Stack alignItems='center' sx={elementHover} onClick={() => navigate('/members')}>
          <Typography variant='h4'>Members</Typography>
          <PeopleIcon sx={{ fontSize: 100 }} />
          <Typography variant='h4'>{members}</Typography>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Home;