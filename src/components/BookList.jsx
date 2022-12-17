import React, { useState }from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PageTitle from './PageTitle';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DataGridCustom from './DataGridCustom';
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';
import { useNavigate } from 'react-router-dom';

function BookList({ books, onDeleteCheckout }) {
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();

  // snackbar status message
  const setSnackbar = useSetSnackbar();

  const handleNotification = (message, type) => {
    setSnackbar(message, type);
  }

  const columns = [
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'isbn', headerName: 'ISBN', width: 200 },
    { field: 'authorName', headerName: 'Author', width: 200 },
    { field: 'isCheckedOut', headerName: 'Available', width: 200 },
    { field: 'genre', headerName: 'Genre', width: 200 }
  ]

  const rows = [];
  books.map(book => {
    const container = {};
    const full_name = `${book.author.first_name} ${book.author.last_name}`;
    const checkoutValue = book.is_checked_out ? 'Checked Out' : 'Available';
    
    container.id = book.id;
    container.title = book.title;
    container.isbn = book.isbn;
    container.authorName = full_name;
    container.isCheckedOut = checkoutValue;
    container.genre = book.genre.name;
    return rows.push(container);
  })

  // handles book check in
  const selectionValidation = Array.isArray(selectionModel) && !selectionModel.length;

  const handleCheckInClick = () => {
    // displays error message if nothing is selected
    if (selectionValidation) {
      handleNotification('No book selected','error')
    } else {
      const bookId = selectionModel[0];
      const book = books.find(book => book.id === bookId);
      const id = book.checkout.id;
      const memberId = book.checkout.member.id;

      fetch(`http://localhost:9292/checkouts/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => onDeleteCheckout(id, bookId, memberId));

      fetch(`http://localhost:9292/books/${bookId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({is_checked_out: false}),
      })
        .then(res => res.json())

      setSelectionModel([]);
      handleNotification('Check In Successful', 'success');
    }
  }

  return (
    <Box mx={3} mb={3}>
      <Stack spacing={2} direction='row' justifyContent='space-between'>
        <PageTitle title='Books' />
        <Button variant='text' color='secondary' onClick={() => navigate('/books/new-book-form')}>Add New<LibraryAddIcon sx={{ ml: 1 }}/></Button>
      </Stack>
      <DataGridCustom height={650} pageSize={10} rows={rows} columns={columns} setCheckbox={false} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
      <Button variant='contained' onClick={handleCheckInClick}>Check In Selected Items</Button>
      <StatusMessage />
  </Box>
  )
}

export default BookList;