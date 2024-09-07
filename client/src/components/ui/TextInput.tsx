import TextField from '@mui/material/TextField';
import {colorPalette as color} from '../../utils/colorPalette'

type TextFieldProps  = {
    label: string,
    name: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string | number
};

export default function TextInput(props: TextFieldProps){

    return(
        <TextField
          id="standard-multiline-flexible"
          label={props.label}
          multiline
          required
          onChange={props.onChange}
          name={props.name}
          type='text'
          value={props.value}
          maxRows={4}
          variant="standard"
          sx={{
            width: '100%',
            fontFamily: 'Roboto',
            '.MuiInput-underline:before': {
              borderBottomColor: color.light, 
            },
            '.MuiInput-underline:hover:before': {
              borderBottomColor: `${color.light} !important`, 
            },
            '.MuiInput-underline:after': {
              borderBottomColor: color.action,
            },
            '.MuiInputLabel-root': {
              color: color.light,
               
            },
            '.MuiInputLabel-root.Mui-focused': {
              color: color.light, 
            },
            '.MuiInputBase-input': {
              color: color.light, 
              fontSize:'clamp(0.884rem, 1.0736rem + 0.1596vw, 1.0417rem)',
            },
            '.MuiInputBase-input:focus': {
              color: color.light, 
            },
          }}
        />
    );
}