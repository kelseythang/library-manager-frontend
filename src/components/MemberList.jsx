import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  // useEffect to fetch members
  useEffect(() => {
    fetch('http://localhost:9292/members')
      .then(res => res.json())
      .then(data => setMembers(data));
  }, []);

  const handleDelete = id => {
    const updatedMembers = members.filter(member => {
      return member.id !== id;
    })
    setMembers(updatedMembers);
  }
  
  // handles member delete
  const handleDeleteClick = () => {
    const id = selectionModel.row.id;
    fetch(`http://localhost:9292/members/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => handleDelete(id));
  }

  // diverts from javascript key naming convention to match database
  const columns = [
    { 
      field: 'library_card_number',
      headerName: 'Library Card',
      width: 150,
      editable: false,
    },
    { 
      field: 'first_name',
      headerName: 'First Name',
      width: 150,
      editable: false,
    },
    { 
      field: 'last_name',
      headerName: 'Last Name',
      width: 150,
      editable: false,
    },
    { 
      field: 'phone_number',
      headerName: 'Phone Number',
      width: 150,
      editable: false,
    },
    { 
      field: 'email',
      headerName: 'Email',
      width: 250,
      editable: false,
    },
    { 
      field: 'fines',
      headerName: 'Fines',
      width: 150,
      editable: false,
    },

  ]

  return (
    <Box>
      <Stack spacing={2} direction='row' justifyContent='space-between'>
        <Typography variant='h2' mb={2}>Members</Typography>
      <Button variant='text' color='secondary'>+ Add New</Button>
      </Stack>
      <Box mb={2} sx={{ height: 650, width: '100%' }}>
        <DataGrid
          rows={members}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onRowClick={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}

        />
      </Box>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' onClick={() => console.log(selectionModel.row.id)}>Edit</Button>
        <Button variant='contained'>Previous Checkouts</Button>
        <Button variant='contained' onClick={handleDeleteClick}>Delete</Button>
      </Stack> 
    </Box>
  )
}

export default MemberList;