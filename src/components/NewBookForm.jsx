import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PageTitle from './PageTitle';
import { useNavigate } from 'react-router-dom';
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';

function NewBookForm({ onAddBook }) {
  // sets initial data for form
  const initialState = {
    title: '',
    isbn: '',
    author_id: '',
    is_checked_out: false,
    genre_id: '',
    checkout: null
  }

  // sets state to have controlled inputs
  const [formData, setFormValues] = useState(initialState);
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  // ----------------- fetch requests ----------------- //
  // useEffect to fetch authors
  useEffect(() => {
    fetch('http://localhost:9292/authors')
      .then(res => res.json())
      .then(data => setAuthors(data));
  }, []);

  // useEffect to fetch genres
  useEffect(() => {
    fetch('http://localhost:9292/genres')
      .then(res => res.json())
      .then(data => setGenres(data));
  }, []);

  // snackbar status message
  const setSnackbar = useSetSnackbar();

  const handleNotification = (message, type) => {
    setSnackbar(message, type)
  }

  // handles state change
  const handleInputChange = e => {
    if (e.target.name === 'isbn') {
      setFormValues({
        ...formData,
        [e.target.name]: parseInt(e.target.value),
      })
    } else {
      setFormValues({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  }

  // handles submission of form
  const handleSubmit = e => {
    e.preventDefault();
    const author = authors.find(author => author.id === formData.author_id);
    const genre = genres.find(genre => genre.id === formData.genre_id);

    fetch('http://localhost:9292/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      // updates destination state
      .then((data) => {
        const bookObj = {...data, 
          author: {first_name: author.first_name, last_name: author.last_name}, 
          genre: {name: genre.name}
        };
        onAddBook(bookObj)
      });
    
    // clears form inputs after form submit and alerts user
    setFormValues(initialState);
    handleNotification('Book added to library', 'success');
  }

  return (
    <Box>
      <Stack spacing={2} direction='row' justifyContent='space-between'>
        <PageTitle title='New Book Form' />
        <Button onClick={() => navigate('/books')}>← Return to All Books</Button>
      </Stack>
      <Box component='form' sx={{ width: 400}} onSubmit={handleSubmit}>
        <Stack spacing={2} mb={2} direction='column'>
          <Typography variant='body1'>Complete the information below:</Typography>
          <TextField
            id='outlined-required'
            variant='outlined'
            label='Title'
            InputLabelProps={{ shrink: true }}
            name='title'
            value={formData.title}
            onChange={handleInputChange}
          />
          <TextField
            id='outlined-required'
            variant='outlined'
            label='ISBN'
            type='number'
            helperText='Please enter the 13-digit ISBN number'
            InputLabelProps={{ shrink: true }}
            name='isbn'
            value={formData.isbn}
            onChange={handleInputChange}
          />
          <TextField
            id='author'
            label='Existing Author'
            select
            InputLabelProps={{ shrink: true }}
            name='author_id'
            value={formData.author_id}
            onChange={handleInputChange}
          >
            {authors.map(author => (
              <MenuItem key={author.id} value={author.id}>{author.first_name} {author.last_name}</MenuItem>
            ))}
          </TextField>
          <TextField
            id='genre'
            label='Genre'
            select
            defaultValue='Adventure'
            InputLabelProps={{ shrink: true }}
            name='genre_id'
            value={formData.genre_id}
            onChange={handleInputChange}
          >
            {genres.map(genre => (
              <MenuItem key={genre.name} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </TextField>
        </Stack>
        <Button type='submit' variant='contained'>Submit</Button>
      </Box>
      <StatusMessage />
    </Box>
  )
}

export default NewBookForm;