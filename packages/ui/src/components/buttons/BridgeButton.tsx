import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const BridgeTextField = styled(Button)({
  backgroundColor: '#FFBA00',
  borderRadius: '8px',
  color: '#ffffff',
  height: '56px',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'center',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  '&:hover': {
    backgroundColor: '#44D7B6',
    borderColor: '#44D7B6',
    boxShadow: 'none',
  },
});

export default BridgeTextField;
