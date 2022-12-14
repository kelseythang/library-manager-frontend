import React from 'react';
import Typography from '@mui/material/Typography';
import PageTitle from './PageTitle';


function NotFound() {
  return (
    <>
      <PageTitle title='Page Not Found' />
      <Typography variant='body1'>Error 404</Typography>
    </>
  )
}

export default NotFound;