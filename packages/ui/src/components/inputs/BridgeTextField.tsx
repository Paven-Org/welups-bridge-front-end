import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

const BridgeTextField = styled(TextField)({
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    height: '64px',
    '& fieldset': {
      borderColor: '#2A323D',
      color: '#ffffff',
    },
    '&:hover fieldset': {
      borderColor: '#FFFFFF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFFFFF',
    },
  },
});

export default BridgeTextField;
