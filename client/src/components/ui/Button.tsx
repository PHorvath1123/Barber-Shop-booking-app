import Button from "@mui/material/Button";
import { colorPalette as color } from "../../utils/colorPalette";

type ButtonProps = {
  type?: "submit" | "reset" | "button";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "contained" | "outlined";
  children: React.ReactNode;
  size?: "sm" | "lg";
  disabled?: boolean;
};

export default function CustomButton({
  variant = "contained",
  size,
  ...props
}: ButtonProps) {
    
  const outlinedStyle = {
    backgroundColor: "transparent",
    color: color.light,
    border: `1px solid ${color.action}`,
    fontFamily: "Roboto",
    height: "5ch",
    width: "fit-content",
    minWidth: size === "sm" ? "10ch" : "20ch",
    fontSize: "clamp(0.6252rem, 0.9172rem + 0.2459vw, 0.8681rem)",
    ":hover": {
      backgroundColor: "transparent",
      color: color.hoverAction,
      border: `1px solid ${color.hoverAction}`,
    },
    "@media (min-width:600px)": {
      height: size === "sm" ? "4ch" : "6ch",
      width: size === "sm" ? "15ch" : "25ch",
    },
  };

  const containedStyle = {
    backgroundColor: props.type === "reset" ? "#6e6e6e" : color.action,
    fontFamily: "Roboto",
    height: "5ch",
    width: "fit-content",
    minWidth: size === "lg" ? "35ch" : "16ch",
    fontSize: "clamp(0.6252rem, 0.9172rem + 0.2459vw, 0.8681rem)",
    ":hover": {
      backgroundColor: props.type === "reset" ? "#292929" : color.hoverAction,
    },
    "&.Mui-disabled": {
      backgroundColor: "#c58d84",
      color: color.light,
    },
    "@media (min-width:768px)": {
      height: "6ch",
      width: "25ch",
    },
  };

  return (
    <Button
      sx={variant === "contained" ? containedStyle : outlinedStyle}
      variant={variant}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </Button>
  );
}
