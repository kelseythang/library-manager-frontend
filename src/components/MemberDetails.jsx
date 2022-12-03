import React from 'react';
import { useLocation } from "react-router-dom";
import Box from '@mui/material/Box';
import PageTitle from './PageTitle';

function MemberDetails () {
  const location = useLocation();
  const member = location.state.member;

  const records = member.records.forEach(record => console.log(record))

  return (
    <Box>
      <PageTitle title='Member Details' />
      <p>Library Card: {member.library_card_number}</p>
      <p>Name: {member.first_name} {member.last_name}</p>
    </Box>
  )
}

export default MemberDetails;