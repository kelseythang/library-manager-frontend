import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';
import { indigo, green, grey } from '@mui/material/colors';

// color tokens for app
// export const colorTokens = (mode) => {{
//   ...(mode === 'light') 
//   ?
//   :
// }}

// creates mui theme settings
export const themeSettings = (mode) => {
  //const colors = colorTokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === 'light'
        ? {
          primary: {
            main: indigo[100],
          },
          secondary: {
            main: green[500],
          },
          neutral: {
            dark: grey[700],
            main: grey[500],
            light: grey[100]
          },
          background: {
            default: '#fcfcfc'
          }
        } : {
          primary: {
            main: indigo[500],
          },
          secondary: {
            main: green[500],
          },
          neutral: {
            dark: grey[700],
            main: grey[500],
            light: grey[100]
          },
          background: {
            default: indigo[500]
          }
        }
      )
    }
  }
}

// color mode context
export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});

export const useMode = () => {
  const [mode, setMode] = useState('light');
  
  const colorMode = useMemo(() => ({
    toggleColorMode: () => setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark'),
  }), []);

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return [theme, colorMode];
}