import { createTheme } from '@mui/material/styles';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
});
const theme = createTheme({
  breakpoints:{
    values: {
      
      mobileS: 0,
      xs: 360, // 380px
      sm: 600, // 600px
      md: 960, // 960px
      lg: 1280, // 1280px
      xl: 1920, // 1920px
    },
  },
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
    },
    borderColor: '#E5E5E5', // Light gray border color
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: (props) => {
          const { theme } = props; // ✅ yeh line zaroori hai
          return {
            padding: '14px 20px',
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: '17px',
            '&.Mui-disabled': {
              backgroundColor: '#cccccc',
              color: '#FFFFFF',
            },
            [theme.breakpoints.down('sm')]: {
              padding: '10px 20px', // ✅ small screen par padding
            },
          };
        }
      },
      defaultProps: {
        variant: 'contained',
        color: 'primary',
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: (props) => {
          const { theme } = props; // ✅ yeh line zaroori hai
          return {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E5E5', // Light gray border
              borderWidth: 1,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E5E5',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E5E5E5', // Primary color on focus
              borderWidth: 1,

            },
     '& input': {
      paddingTop: '14px',
      paddingBottom: '14px',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '14px',     // ✅ Sm screen pe kam padding
        paddingBottom: '14px',
      },
      [theme.breakpoints.down('xs')]: {
        paddingTop: '11px',     
        paddingBottom: '11px',
      },
      
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
        };
      }
      },
    },
  },
});

export default theme;
