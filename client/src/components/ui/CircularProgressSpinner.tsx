import CircularProgress from "@mui/material/CircularProgress";
import { colorPalette as color } from "../../utils/colorPalette";

export default function CircularProgressSpinner() {
  return (
    <CircularProgress
      sx={{
        color: color.action,
        margin: "70px 0px",
      }}
    />
  );
}
