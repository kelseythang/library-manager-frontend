import React, { useState, useEffect } from 'react'
import { ThemeProvider, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext, useMode } from '../contexts/ThemeContext';
import '../index.css';
import { Routes, Route, useParams } from 'react-router-dom';
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
import NewMemberForm from './NewMemberForm';
import NotFound from './NotFound';
import EditMember from './EditMember';
import MemberDetails from './MemberDetails';

function App() {
  const [theme, colorMode] = useMode();
  const [members, setMembers] = useState([]);
  //let { memberId } = useParams();

  // useEffect to fetch members
  useEffect(() => {
    fetch('http://localhost:9292/members')
      .then(res => res.json())
      .then(data => setMembers(data));
  }, []);

   // updates members based on form submission
   const handleAddMember = newMember => {
    setMembers([...members, newMember]);
  }

  // updates members based on member deletion
  const handleDeleteMember = (id) => {
    const updatedMembers = members.filter(member => {
      return member.id !== id;
    })

    setMembers(updatedMembers);
  }

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
                    <Route path='*' element={<NotFound />} />
                    <Route path='/' element={<Home />} />
                    <Route path='books' element={<BookList />} />
                    <Route path='members'>
                      <Route index={true} element={<MemberList members={members} onDeleteMember={handleDeleteMember} /> } />
                      <Route path='new-member-form' element={<NewMemberForm onAddMember={handleAddMember} />} />
                      <Route path='edit-member-details' element={<EditMember />} />
                      <Route path=':card' element={<MemberDetails members={members} />} />
                    </Route>
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