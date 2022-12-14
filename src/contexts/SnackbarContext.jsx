import React, { useState, createContext, memo } from 'react';

export const SnackbarValueContext = createContext({});
export const SnackbarSetContext = createContext(() => {});

export const SnackbarProvider = memo(({ setSnackbar, children }) => {
  const handleSnackbarSet = (message, type) => {
    setSnackbar({message, type});
  }

  return (
    <SnackbarSetContext.Provider value={handleSnackbarSet}>
      {children}
    </SnackbarSetContext.Provider>
  )
})

export const SnackbarContextProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    message: '',
    type: ''
  });

  return (
    <SnackbarValueContext.Provider value={snackbar}>
      <SnackbarProvider setSnackbar={setSnackbar}>
        {children}
      </SnackbarProvider>
    </SnackbarValueContext.Provider>
  )
}