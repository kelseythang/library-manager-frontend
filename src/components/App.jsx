import React, { useState, useEffect } from 'react';
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import { ColorModeContext, useMode } from '../contexts/ThemeContext';
import { SnackbarContextProvider } from '../contexts/SnackbarContext';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './Home';
import NavBar from './NavBar';
import NavBarDrawer from './NavBarDrawer';
import CheckoutList from './CheckoutList';
import BookList from './BookList';
import NewBookForm from './NewBookForm';
import MemberList from './MemberList';
import NewMemberForm from './NewMemberForm';
import MemberDetails from './MemberDetails';
import NotFound from './NotFound';

function App() {
  const [theme, colorMode] = useMode();
  const [checkouts, setCheckouts] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  ////////////////////////////////////////////////////////
  //                    fetch requests                  //
  ////////////////////////////////////////////////////////
  useEffect(() => {
    Promise.all([
      fetch('http://localhost:9292/checkouts'),
      fetch('http://localhost:9292/books'),
      fetch('http://localhost:9292/members')
    ]).then(responses =>
      Promise.all(responses.map(response => response.json()))
    ).then(data => {
      setCheckouts(data[0]);
      setBooks(data[1]);
      setMembers(data[2]);
    }
    ).catch(err => console.log(err))
  }, [])

  /////////////////////////////////////////////////////////
  //                    checkouts CRUD                   //
  /////////////////////////////////////////////////////////

  const handleDeleteCheckout = (updatedCheckouts, id, bookId, memberId) => {
    setCheckouts(updatedCheckouts);

    const selectedBook = books.find(book => book.id === bookId);
    const updatedBook = {...selectedBook, checkout: null, is_checked_out: false };
    const updatedBooks = books.map(book => (book.id === bookId) ? updatedBook : book);
    setBooks(updatedBooks);

    const selectedMember = members.find(member => member.id === memberId);
    const selectedMemberCheckouts = selectedMember.checkouts.filter(checkout => checkout.id !== id);
    const updatedMember = {...selectedMember, checkouts: selectedMemberCheckouts};
    const updatedMembers = members.map(member => (member.id === memberId) ? updatedMember : member);
    setMembers(updatedMembers);
  }

  /////////////////////////////////////////////////////////
  //                      books CRUD                     //
  /////////////////////////////////////////////////////////

  // adds book based on form submission
  const handleAddBook = (newBook) => setBooks([...books, newBook]);

  /////////////////////////////////////////////////////////
  //                     members CRUD                    //
  /////////////////////////////////////////////////////////

  // adds member based on form submission
  const handleAddMember = newMember => setMembers([...members, newMember]);

  // deletes member based on member deletion
  const handleDeleteMember = memberRes => setMembers(memberRes);

  // updates member based on edits
  const handleEditMember = updatedMember => setMembers(updatedMember);

  /////////////////////////////////////////////////////////
  //                 MUI background styling              //
  /////////////////////////////////////////////////////////

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
                  {theme.palette.mode === 'light' ? (<LightModeIcon />) : (<DarkModeIcon />)}
                </IconButton>
              </Stack>
            </Stack>
            <Item>
              <Routes>
                <Route path='*' element={<NotFound />} />
                <Route path='/' element={<Home checkouts={checkouts.length} books={books.length} members={members.length} />} />
                <Route path='checkouts' element={<CheckoutList checkouts={checkouts} onDeleteCheckout={handleDeleteCheckout} />} />
                <Route path='books' element={<BookList books={books} onDeleteCheckout={handleDeleteCheckout} />} />
                <Route path='books/new-book-form' element={<NewBookForm onAddBook={handleAddBook} />} />
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

export default App;