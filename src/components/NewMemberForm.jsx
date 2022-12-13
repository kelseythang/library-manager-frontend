import React, { useState } from 'react';
import MuiPhoneNumber from 'material-ui-phone-number-2';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PageTitle from './PageTitle';
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';

function NewMemberForm({ onAddMember }) {
  // sets initial data for form
  const initialState = {
    library_card_number: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    fines: 0
  }

  // sets state to have controlled inputs
  const [formData, setFormValues] = useState(initialState);
  const navigate = useNavigate();

  // snackbar status message
  const setSnackbar = useSetSnackbar();

  const handleSubmitNotification = (type) => {
    setSnackbar('Member added to database', type)
  }

  // handles state change
  const handleInputChange = e => {
    setFormValues({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhoneInputChange = e => {
    setFormValues({
      ...formData,
      phone_number: e,
    })
  };

  // handles submission of form
  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:9292/members', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      // updates destination state
      .then(data => onAddMember(data));
    
    // clears form inputs after form submit and alerts user
    setFormValues(initialState);
    handleSubmitNotification('success');
  }

  return (
    <Box>
      <Stack spacing={2} direction='row' justifyContent='space-between'>
        <PageTitle title='New Member Form' />
        <Button onClick={() => navigate('/members')}>← Return to All Members</Button>
      </Stack>
      <Box component='form' sx={{ width: 400}} onSubmit={handleSubmit}>
        <Stack spacing={2} mb={2} direction='column'>
          <Typography variant='body1'>Complete the information below:</Typography>
          <TextField
            id='outlined-required'
            variant='outlined'
            label='First Name'
            InputLabelProps={{ shrink: true }}
            name='first_name'
            value={formData.first_name}
            onChange={handleInputChange}
          />
          <TextField
            id='outlined-required'
            variant='outlined'
            label='Last Name'
            InputLabelProps={{ shrink: true }}
            name='last_name'
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <TextField
            id='outlined-required'
            variant='outlined'
            label='Email Address'
            InputLabelProps={{ shrink: true }}
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
          <MuiPhoneNumber
            variant='outlined'
            defaultCountry='us'
            label='Phone Number'
            name='phone_number'
            data-cy='user-phone'
            value={formData.phone_number}
            onChange={handlePhoneInputChange}
          />
        </Stack>
        <Button type='submit' variant='contained'>Submit</Button>
      </Box>
      <StatusMessage />
    </Box>
  )
}

export default NewMemberForm;