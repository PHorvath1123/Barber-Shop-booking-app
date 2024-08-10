import Button from '@mui/material/Button';

type ButtonProps = {
    text: string | number,
    type?: 'submit' | 'reset' | 'button',
    onClick?: React.MouseEventHandler<HTMLButtonElement> 
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
                '@media (min-width:768px)':{
                    height: '6ch',
                    width: '25ch'
                },
            }} 
            variant='contained'
            type={props.type}
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
};