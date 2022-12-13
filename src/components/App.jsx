import React, { useState, useEffect } from 'react';
import {flushSync} from 'react-dom';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ColorModeContext, useMode } from '../contexts/ThemeContext';
import '../index.css';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Icon, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './Home';
import NavBar from './NavBar';
import NavBarDrawer from './NavBarDrawer';
import BookList from './BookList';
import CheckoutList from './CheckoutList';
import MemberList from './MemberList';
import NewMemberForm from './NewMemberForm';
import MemberDetails from './MemberDetails';
import NotFound from './NotFound';
import { SnackbarContextProvider } from '../contexts/SnackbarContext';

function App() {
  const [theme, colorMode] = useMode();
  const [members, setMembers] = useState([]);
  const [checkouts, setCheckouts] = useState([]);
  const [books, setBooks] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // ----------------- fetch requests ----------------- //
  // useEffect to fetch checkouts
  useEffect(() => {
    fetch('http://localhost:9292/checkouts')
      .then(res => res.json())
      .then(data => setCheckouts(data));
  }, []);

  // useEffect to fetch books
  useEffect(() => {
    fetch('http://localhost:9292/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  // useEffect to fetch members
  useEffect(() => {
    fetch('http://localhost:9292/members')
      .then(res => res.json())
      .then(data => setMembers(data));
  }, []);
  
  // ----------------- members CRUD ----------------- //
  // adds members based on form submission
  const handleAddMember = newMember => {
    setMembers([...members, newMember]);
  }

  // deletes members based on member deletion
  const handleDeleteMember = (id) => {
    const updatedMembers = members.filter(member => member.id !== id)
    setMembers(updatedMembers);

    const updatedCheckouts = checkouts.filter(checkout => checkout.member_id !== id)
    setCheckouts(updatedCheckouts);
  }

  // updates members based on edits
  const handleEditMember = updatedMember => {
    const updatedMembers = members.map(member => {
      if (member.id === updatedMember.id) {
        return updatedMember;
      } else {
        return member;
      }
    })
    setMembers(updatedMembers);
  }

  // ----------------- checkouts CRUD ----------------- //
  const handleDeleteCheckout = (id, memberId) => {
    const updatedCheckouts = checkouts.filter(checkout => checkout.id !== id);
    setCheckouts(updatedCheckouts);

    const selectedMember = members.find(member => member.id === memberId);
    const selectedMemberCheckouts = selectedMember.checkouts.filter(checkout => checkout.id !== id);
    const updatedMember = {...selectedMember, checkouts: selectedMemberCheckouts};
    const updatedMembers = members.map(member => (member.id === memberId) ? updatedMember : member);
    setMembers(updatedMembers);
  }

  // ----------------- MUI background styling ----------------- // 
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
          <Box my={4} mx={4}>
            <Stack mb={3} direction='row' justifyContent='space-between' spacing={2}>
              <Typography variant='h1' color='primary' sx={{ fontWeight: 'bold' }}>LIBRARY MANAGER</Typography>
              <Stack direction='row' alignItems='center' spacing={3}>
                {isMobile ? (
                  <>
                    <IconButton onClick={() => setIsDrawerOpen(true)}>
                      <MenuIcon />
                    </IconButton>
                  <NavBarDrawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
                  </>  
                ) : (<NavBar />) }
                <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === 'light' ? (<LightModeIcon />) : (<DarkModeIcon />) }
                </IconButton>
              </Stack>
            </Stack>
            <Item>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home checkouts={checkouts.length} books={books.length} members={members.length} />} />
                <Route path='checkouts' element={<CheckoutList checkouts={checkouts} onDeleteCheckout={handleDeleteCheckout} />} />
                <Route path='books' element={<BookList />} />
                <Route path='members' element={<MemberList members={members} onDeleteMember={handleDeleteMember}/> } />
                <Route path='members/new-member-form' element={<NewMemberForm onAddMember={handleAddMember} />} />
                <Route path='members/:id' element={<MemberDetails members={members} onEditMember={handleEditMember} onDeleteCheckout={handleDeleteCheckout}  />} />
              </Routes>
            </Item>
          </Box>
        </SnackbarContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App