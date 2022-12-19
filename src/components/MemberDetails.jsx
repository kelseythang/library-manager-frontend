import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import PageTitle from './PageTitle';
import DataGridCustom from './DataGridCustom';
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';

function MemberDetails ({ members, onEditMember, onDeleteCheckout }) {
  const { id } = useParams();
  const member = members.find(member => member.id === parseInt(id));
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();

  // snackbar status message
  const setSnackbar = useSetSnackbar();
  const handleNotification = (message, type) => setSnackbar(message, type);
  console.log('page loading')
  // information for column headers
  const columns = [
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'date', headerName: 'Checkout Date', width: 200 }
  ]
  
  // information for current checkouts data 
  const currentCheckouts = [];
  member.checkouts?.map(record => {
    const container = {};
    const utcDate = record.created_at;
    const date = new Date(utcDate).toLocaleString();
    const full_name = `${record.book.author.first_name} ${record.book.author.last_name}`;
    
    container.id = record.id;
    container.title = record.book.title;
    container.author = full_name;
    container.date = date;
    return currentCheckouts.push(container);
  })

  //information for checkout history data
  const checkoutHistory = [];
  member.records?.map(record => {
    const container = {};
    const utcDate = record.created_at;
    const date = new Date(utcDate).toLocaleString();
    const full_name = `${record.book.author.first_name} ${record.book.author.last_name}`;
    
    container.id = record.id;
    container.title = record.book.title;
    container.author = full_name;
    container.date = date;
    return checkoutHistory.push(container);
  })

  // handles pay fines click -- PATCH
  const handlePayFines = () => {
    const memberObj = {...member, fines: 0.00};

    fetch(`http://localhost:9292/members/${memberObj.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(memberObj),
    })
    .then(res => res.json())
    .then(data => onEditMember(data));
  }

  // handles book check in
  const handleCheckInClick = () => {
    const id = selectionModel[0];

    fetch(`http://localhost:9292/checkouts/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => onDeleteCheckout(data));

    setSelectionModel([]);
    handleNotification('Check In Successful', 'success');
  }

  return (
    <Box mx={3} mb={3}>
      <Stack spacing={2} direction='row' justifyContent='space-between'>
        <PageTitle title='Member Details' />
        <Button onClick={() => navigate('/members')}>← Return to All Members</Button>
      </Stack>
      <Box mb={1}>
        <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Library Card: </Box>{member.library_card_number}</Typography>
        <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Name: </Box>{member.first_name} {member.last_name}</Typography>
        <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Email Address: </Box>{member.email}</Typography>
        <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Phone Number: </Box>{member.phone_number}</Typography>
        <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Outstanding Fines: $</Box>{parseFloat(member.fines).toFixed(2)}</Typography>
      </Box>
      <Button variant='outlined' color='secondary' onClick={handlePayFines}>Pay Fines in Full</Button>
      <Typography variant='h3' my={1}>Current Checkouts</Typography>
      <DataGridCustom height={275} pageSize={5} rows={currentCheckouts} columns={columns} setCheckbox={false} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
      <Button variant='contained' onClick={handleCheckInClick}>Check In Selected Book</Button>
      <Typography variant='h3' my={1}>Checkout History</Typography>
      <Box mb={2} sx={{ height: 375, width: '100%' }}>
        <DataGrid
          rows={checkoutHistory}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
      <StatusMessage />
    </Box>
  )
}

export default React.memo(MemberDetails);