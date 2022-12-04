import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import PageTitle from './PageTitle';

function MemberDetails ({ members, onEditMember }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const member = members.find(member => member.id === parseInt(id));
  console.log(member)

  const columns = [
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'date', headerName: 'Checkout Date', width: 200 },
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

  // patch
  const updatedMember = {
    fines: 0.00
  }
 

  const handlePayFines = () => {
    fetch(`http://localhost:9292/members/${member.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMember),
    })
      .then(res => res.json())
      .then(updatedFines => onEditMember(updatedFines));
  }

  return (
    <Box>
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
      <Box mb={2} sx={{ height: 275, width: '100%' }}>
        <DataGrid
          rows={currentCheckouts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </Box> 
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
    </Box>
  )
}

export default MemberDetails;