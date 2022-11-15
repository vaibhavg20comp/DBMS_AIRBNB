import TextField from '@mui/material/TextField';
import { forwardRef } from 'react';

const phoneInput = (props, ref) => {
  return (
    <TextField
      {...props}
      inputRef={ref}
      margin="normal"
      fullWidth
      label='Phone Number'
      variant='outlined'
      name='phone'
    />
  )
}
export default forwardRef(phoneInput)