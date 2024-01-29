import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#f7a873',
    },
    text: {
            secondary: 'rgba(0,0,0,0.67)',
    },
  },
};


export const theme = createTheme(themeOptions);