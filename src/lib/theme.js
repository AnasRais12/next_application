import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});
const theme = createTheme({
  typography:{
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#1a1a1a',
    },
    error: {
      main: '#d32f2f',
    },
    success:{
      main: '#0c9409',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 20px',
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '16px',
          '&.Mui-disabled': {
            backgroundColor: '#cccccc',
            color: '#FFFFFF',
          },
        },
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px', // Rounded border
          
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E5E5', // Light gray border
              borderWidth: 1,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E5E5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1a1a1a', // Primary color on focus
            },
          },
          '& input::placeholder': {
            color: '#999999',
            opacity: 1,
            fontWeight: 400,
          },
          '& .MuiFormHelperText-root.Mui-error': {
            marginLeft: 0,
            fontSize: '0.75rem',
            color: '#d32f2f',
          },
        },
      },
    },
  },
});

export default theme;
