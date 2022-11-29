import React  from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSnackbar } from '../hooks/useSnackbar';

export default function StatusMessage() {
  // destructured from Snackbar context
  const { snackbar, setSnackbar } = useSnackbar();
  const { message, type } = snackbar;

  // MUI alert settings from docs
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setSnackbar('')}> 
      <Alert severity={type} sx={{ width: '100%' }}>{message}</Alert>
    </Snackbar>
  )
}