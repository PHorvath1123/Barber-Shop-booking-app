import Button from '@mui/material/Button';
import {colorPalette as color} from '../../utils/colorPalette'

type ButtonProps = {
    type?: 'submit' | 'reset' | 'button',
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
    variant?: 'text' | 'contained' | 'outlined',
    children: React.ReactNode
};

const containedStyle = {
    backgroundColor: color.action,
    fontFamily: 'Roboto',
    height: '5ch',
    width: 'fit-content',
    minWidth: '16ch',
    fontSize: 'clamp(0.6252rem, 0.9172rem + 0.2459vw, 0.8681rem)',
    ":hover":{
        backgroundColor: color.hoverAction,
    },
    '@media (min-width:768px)':{
        height: '6ch',
        width: '25ch'
    }
};

const outlinedStyle = {
    backgroundColor: 'transparent',
    color: color.light,
    border: `1px solid ${color.action}`,
    fontFamily: 'Roboto',
    height: '5ch',
    width: 'fit-content',
    minWidth: '16ch',
    fontSize: 'clamp(0.6252rem, 0.9172rem + 0.2459vw, 0.8681rem)',
    ":hover":{
        backgroundColor: 'transparent',
        color: color.hoverAction,
        border: `1px solid ${color.hoverAction}`
    },
    '@media (min-width:768px)':{
        height: '6ch',
        width: '25ch'
    }
};

export default function CustomButton({variant = "contained", ...props}: ButtonProps){
    
    return(
        <Button 
            sx={variant === "contained" ? containedStyle : outlinedStyle} 
            variant={variant}
            type={props.type}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    );
};

