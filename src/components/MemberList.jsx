import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';
import PageTitle from './PageTitle';
import { useNavigate } from 'react-router-dom';

function MemberList({ members, onDeleteMember }) {
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();

  // snackbar status message
  const setSnackbar = useSetSnackbar();

  const handleError = (type) => {
    setSnackbar('No member selected.', type)
  }

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
        .then(() => onDeleteMember(id));

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
      <Stack spacing={2} direction='row' justifyContent='space-between'>
        <PageTitle title='Members' />
        <Button variant='text' color='secondary' onClick={() => navigate('/members/new-member-form')}>+ Add New</Button>
      </Stack>
      <Box mb={2} sx={{ height: 650, width: '100%' }}>
        <DataGrid
          components={{ Toolbar: GridToolbar }}
          disableColumnSelector
          disableDensitySelector
          componentsProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
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
          <Button variant='contained' onClick={() => navigate('/members/edit-member-details')}>Edit</Button>
          <Button variant='contained'>Details</Button>
        </Stack>
        <Button variant='text' color='error' onClick={handleDeleteClick}>Delete</Button>
      </Stack> 
      <StatusMessage />
    </Box>
  )
}

export default MemberList;