import Button from '@mui/material/Button';
import {colorPalette as color} from '../../utils/colorPalette'

type ButtonProps = {
    text: string | number,
    type?: 'submit' | 'reset' | 'button',
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    variant?: 'text' | 'contained' | 'outlined',
};

CustomButton.defaultProps = {
    variant: 'contained'
};

export default function CustomButton(props: ButtonProps){
    
    return(
        <Button 
            sx={{
                backgroundColor: props.variant === "contained" ? color.action : "transparent",
                color: props.variant === "text" ? color.action : null,
                fontFamily: 'Roboto',
                height: '5ch',
                width: 'fit-content',
                minWidth: '16ch',
                fontSize: 'clamp(0.6252rem, 0.9172rem + 0.2459vw, 0.8681rem)',
                ":hover":{
                    backgroundColor: props.variant === "contained" ? color.hoverAction : 'transparent',
                    color: props.variant !== "contained" ? color.hoverAction : null
                },
                '@media (min-width:768px)':{
                    height: '6ch',
                    width: '25ch'
                },
            }} 
            variant={props.variant}
            type={props.type}
            onClick={props.onClick}
        >
            {props.text}
        </Button>
    );
};

