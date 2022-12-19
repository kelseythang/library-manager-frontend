import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PageTitle from './PageTitle';
import Button from '@mui/material/Button';
import DataGridCustom from './DataGridCustom';
import { useSetSnackbar } from '../hooks/useSnackbar';
import StatusMessage from './StatusMessage';

function CheckoutList({ checkouts, onDeleteCheckout }) {
  const [selectionModel, setSelectionModel] = useState([]);

  // snackbar status message
  const setSnackbar = useSetSnackbar();
  const handleNotification = (message, type) => setSnackbar(message, type);
  console.log('rendering')
  const columns = [
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'memberName', headerName: 'Member', width: 200 },
    { field: 'date', headerName: 'Checkout Date', width: 200 }
  ]

  const rows = [];
  checkouts?.map(checkout => {
    const container = {};
    const utcDate = checkout.created_at;
    const date = new Date(utcDate).toLocaleString();
    const full_name = `${checkout.member.first_name} ${checkout.member.last_name}`;
    
    container.id = checkout.id;
    container.title = checkout.book.title;
    container.memberName = full_name;
    container.date = date;
    return rows.push(container);
  })

  // handles book check in
  const selectionValidation = Array.isArray(selectionModel) && !selectionModel.length;

  const handleCheckInClick = () => {
    // displays error message if nothing is selected
    if (selectionValidation) {
      handleNotification('No book selected','error')
    } else {
      const id = selectionModel[0];

      fetch(`http://localhost:9292/checkouts/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => onDeleteCheckout(data));

      setSelectionModel([]);
      handleNotification('Check In Successful', 'success');
    }
  }

  return (
    <Box mx={3} mb={3}>
      <Box>
        <PageTitle title='Checkouts' />
        <DataGridCustom height={650} pageSize={10} rows={rows} columns={columns} setCheckbox={false} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
      </Box>
      <Button variant='contained' onClick={handleCheckInClick}>Check In Selected Book</Button>
      <StatusMessage />
    </Box>
  )
}

export default React.memo(CheckoutList);