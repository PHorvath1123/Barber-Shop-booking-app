import Button from '@mui/material/Button';

type ButtonProps = {
    text: string | number
};

export default function CustomButton(props: ButtonProps){
    
    return(
        <Button 
            sx={{
                backgroundColor: '#EF6950',
                fontFamily: 'Roboto',
                height: '5ch',
                width: '16ch',
                fontSize: 'clamp(0.6252rem, 0.9172rem + 0.2459vw, 0.8681rem)',
                ":hover":{
                    backgroundColor: '#c9371d',
                },
            }} 
            variant='contained'>
            {props.text}
        </Button>
    );
};