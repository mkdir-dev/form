import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {},
  components: {
    MuiCssBaseline: {
      styleOverrides: () => `
        body { background-color: #f9f9f9 }
      `,
    },
  },
  typography: {
    h1: {},
    h2: {
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '20px',
      lineHeight: '24px',
      textAlign: 'center',
    },
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '18px',
      textAlign: 'center',
      color: '#8d8d8d',
    },

    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  },
});
