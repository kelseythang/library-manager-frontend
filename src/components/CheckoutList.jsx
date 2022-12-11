import React, { useState } from 'react';
import Box from '@mui/material/Box';
import PageTitle from './PageTitle';
import BasicGrid from './BasicGrid';

function CheckoutList({ checkouts }) {
  const [selectionModel, setSelectionModel] = useState([]);
  console.log(checkouts)
  
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

  console.log(rows)

  return (
    <Box>
      <PageTitle title='Checkouts' />
      <BasicGrid height={650} pageSize={10} rows={rows} columns={columns} selectionModel={selectionModel} setSelectionModel={setSelectionModel} />
    </Box>
  )
}

export default CheckoutList;