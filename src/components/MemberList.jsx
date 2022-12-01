import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
// Snackbar context imports
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';
import PageTitle from './PageTitle';

function MemberList() {
  const [members, setMembers] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);

  // snackbar status message
  const setSnackbar = useSetSnackbar();

  const handleError = (type) => {
    setSnackbar('No member selected.', type)
  }

  // useEffect to fetch members
  useEffect(() => {
    fetch('http://localhost:9292/members')
      .then(res => res.json())
      .then(data => setMembers(data));
  }, []);
  
  // handles member delete
  const handleDeleteClick = () => {
    // displays error message if nothing is selected
    if (Array.isArray(selectionModel) && !selectionModel.length) {
      handleError('error');
    } else {
      const id = selectionModel.row.id;
      
      fetch(`http://localhost:9292/members/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(() => {
          const updatedMembers = members.filter(member => {
            return member.id !== id;
          })

          setMembers(updatedMembers);
        })
      setSelectionModel([]);
    }
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
      <Stack spacing={2} my={2} direction='row' justifyContent='space-between'>
        <PageTitle title='Members' />
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
      <Stack direction='row' justifyContent='space-between'>
        <Stack spacing={2} direction='row'>
          <Button variant='contained' onClick={() => console.log(selectionModel.row.id)}>Edit</Button>
          <Button variant='contained'>Previous Checkouts</Button>
        </Stack>
        <Button variant='text' color='error' onClick={handleDeleteClick}>Delete</Button>
      </Stack> 
      <StatusMessage />
    </Box>
  )
}

export default MemberList;