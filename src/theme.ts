import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e4e4e4',
    },
    background: {
      paper: '#373737',
      default: '#242424',
    },
    text: {
      primary: '#e4e4e4',
    },
    
  },
  shape: {
    borderRadius: 12
}
});

export default theme