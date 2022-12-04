import React from 'react';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import PageTitle from './PageTitle';

function MemberDetails () {
  const location = useLocation();
  const member = location.state.member;

  const columns = [
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'author', headerName: 'Author', width: 200 },
    { field: 'date', headerName: 'Checkout Date', width: 200 },
  ]
  
  const test2 = member.records.map(record => {
    const container = {};
    const utcDate = record.created_at;
    const date = new Date(utcDate);
    const formattedDate = date.toLocaleString();
    const full_name = `${record.book.author.first_name} ${record.book.author.last_name}`;
    
    container.id = record.id;
    container.title = record.book.title;
    container.author = full_name;
    container.date = formattedDate;

    return container;

  })

  return (
    <Box>
      <PageTitle title='Member Details' />
      <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Library Card: </Box>{member.library_card_number}</Typography>
      <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Name: </Box>{member.first_name} {member.last_name}</Typography>
      <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Email Address: </Box>{member.email}</Typography>
      <Typography variant='body1' > <Box component='span'sx={{ fontWeight: 'bold' }}>Phone Number: </Box>{member.phone_number}</Typography>
      <Typography variant='h3' my={1}>Previous Checkouts</Typography>
      <Box mb={2} sx={{ height: 250, width: '100%' }}>
        <DataGrid
          rows={test2}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Box>
    </Box>
  )
}

export default MemberDetails;