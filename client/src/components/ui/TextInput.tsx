import TextField from '@mui/material/TextField';

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
              borderBottomColor: '#D9D9D9', 
            },
            '.MuiInput-underline:hover:before': {
              borderBottomColor: '#D9D9D9 !important', 
            },
            '.MuiInput-underline:after': {
              borderBottomColor: '#EF6950',
            },
            '.MuiInputLabel-root': {
              color: '#D9D9D9',
               
            },
            '.MuiInputLabel-root.Mui-focused': {
              color: '#D9D9D9', 
            },
            '.MuiInputBase-input': {
              color: '#D9D9D9', 
              fontSize:'clamp(0.884rem, 1.0736rem + 0.1596vw, 1.0417rem)',
            },
            '.MuiInputBase-input:focus': {
              color: '#D9D9D9', 
            },
          }}
        />
    );
}