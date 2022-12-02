import React from 'react';
import Typography from '@mui/material/Typography';

function PageTitle({ title }) {
  return (
    <>
      <Typography my={2} variant='h2'>{title}</Typography>
    </>
  )
}

export default PageTitle;