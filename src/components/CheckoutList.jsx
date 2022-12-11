import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PageTitle from './PageTitle';
import BasicGrid from './BasicGrid';
import Button from '@mui/material/Button';
import { indigo } from '@mui/material/colors';

function CheckoutList({ checkouts, onDeleteCheckout }) {
  const [selectionModel, setSelectionModel] = useState([]);
  
  const columns = [
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'memberName', headerName: 'Member', width: 200 },
    { field: 'date', headerName: 'Checkout Date', width: 200 }
  ]

  const rows = [];
  checkouts.map(checkout => {
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
    const handleCheckInClick = () => {
      selectionModel.forEach(id => {
        const checkout = checkouts.find(checkout => checkout.id === id);
        const memberId = checkout.member.id;
        fetch(`http://localhost:9292/checkouts/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(() => onDeleteCheckout(id, memberId));
      })
      setSelectionModel([]);
      }

  return (
    <Box>
      <Box>
        <PageTitle title='Checkouts' />
        <BasicGrid height={650} pageSize={10} rows={rows} columns={columns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
      </Box>
      <Button variant='contained' onClick={handleCheckInClick}>Check In Selected Items</Button>
    </Box>
  )
}

export default CheckoutList;