import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';
import PageTitle from './PageTitle';
import GridCheckbox from './GridCheckbox';
import { useNavigate } from 'react-router-dom';

function MemberList({ members, onDeleteMember }) {
  const [selectionModel, setSelectionModel] = useState([]);
  const navigate = useNavigate();

  // snackbar status message
  const setSnackbar = useSetSnackbar();
 
  const handleNotification = (message, type) => {
    setSnackbar(message, type)
  }

  // user selection validation tests
  const selectionValidation = Array.isArray(selectionModel) && !selectionModel.length;
  
  const handleDetailsClick = () => {
    selectionValidation 
    ? handleNotification('No member selected','error') 
    : navigate(`/members/${selectionModel}`)
  }

  // handles member delete
  const handleDeleteClick = () => {
    // displays error message if nothing is selected
    if (selectionValidation) {
      handleNotification('No member selected','error')
    } else {
      const id = selectionModel[0];

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
    { field: 'library_card_number', headerName: 'Library Card', width: 150, editable: false },
    { field: 'first_name', headerName: 'First Name', width: 150, editable: false },
    { field: 'last_name', headerName: 'Last Name', width: 150, editable: false },
    { field: 'phone_number', headerName: 'Phone Number', width: 150, editable: false },
    { field: 'email', headerName: 'Email', width: 300, editable: false },
    { field: 'fines', headerName: 'Fines', width: 100, editable: false }
  ]

  return (
    <Box mx={3} mb={3}>
      <Stack spacing={2} direction='row' justifyContent='space-between'>
        <PageTitle title='Members' />
        <Button variant='text' color='secondary' onClick={() => navigate('/members/new-member-form')}>Add New<PersonAddIcon sx={{ ml: 1 }}/></Button>
      </Stack>
      <GridCheckbox height={650} pageSize={10} rows={members} columns={columns} setCheckbox={false} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
      <Stack direction='row' justifyContent='space-between'>
        <Button variant='contained'onClick={handleDetailsClick}>Details</Button>
        <Button variant='text' color='error' onClick={handleDeleteClick}>Delete</Button>
      </Stack> 
      <StatusMessage />
    </Box>
  )
}

export default MemberList;