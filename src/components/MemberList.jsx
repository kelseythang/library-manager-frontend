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

  // function handleDeleteQuestion(deletedQuestion) {
  //   const updatedQuestions = questions.filter(question => {
  //     return question.id !== deletedQuestion.id;
  //   })
  //   setQuestions(updatedQuestions);
  // }
  
  // // handles member delete
  // function handleDeleteClick() {
  //   fetch(`http://localhost:9292/members${member.id}`, {
  //     method: 'DELETE',
  //   })
  //     .then(resp => resp.json())
  //     .then(() => onDeleteQuestion(question));
  // }

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
      <Typography variant='h2' mb={2}>Members</Typography>
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
        <Button variant='contained' onClick={() => console.log(selectionModel)}>Edit</Button>
        <Button variant='contained'>Previous Checkouts</Button>
        <Button variant='contained'>Delete</Button>
      </Stack>
    </Box>
  )
}

export default MemberList;