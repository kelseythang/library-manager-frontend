import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import PageTitle from './PageTitle';

function NewMemberForm({ onAddMember }) {
  // sets initial data for form
  const initialState = {
    library_card_number: 12345,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    fines: 0
  }

    // sets state to have controlled inputs
    const [formData, setFormValues] = useState(initialState);

    // handles state change
    const handleInputChange = e => {
      setFormValues({
        ...formData,
        [e.target.name]: e.target.value,
      });
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
      
      // clears form inputs after form submit
      setFormValues(initialState);
    }

  return (
    <Box>
      <PageTitle title='New Member Form' />
      <Box component='form' onSubmit={handleSubmit} sx={{ flexGrow: 1 }}>
        <Stack spacing={2} direction='column'>
          <Typography variant='body1'>Library Card Number: {formData.library_card_number}</Typography>
          <TextField
              id='outlined-required'
              label='First Name'
              InputLabelProps={{ shrink: true }}
              fullWidth
              name='first_name'
              value={formData.first_name}
              onChange={handleInputChange}
          />
          <TextField
            id='outlined-required'
            label='Last Name'
            InputLabelProps={{ shrink: true }}
            fullWidth
            name='last_name'
            value={formData.last_name}
            onChange={handleInputChange}
          />
          <TextField
            id='outlined-required'
            label='Email Address'
            InputLabelProps={{ shrink: true }}
            fullWidth
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
          <TextField
            id='outlined-required'
            label='Phone Number'
            InputLabelProps={{ shrink: true }}
            helperText='Format as 1234567890 instead of 123-456-7890'
            fullWidth
            name='phone_number'
            value={formData.phone_number}
            onChange={handleInputChange}
          />
        </Stack>
        <Button type='submit' variant='contained'>Submit</Button>
      </Box>
    </Box>
  )
}

export default NewMemberForm;