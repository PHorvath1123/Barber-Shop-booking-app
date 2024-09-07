import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState } from "react";

import Button from "./ui/Button"


export default function ServiceSelector() {
  const [service, setService] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = ()=> {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent<unknown>, reason?: string) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <>
      <h2 className={AppointmentStyle.title}>
        Choose a <span className="text-action font-title">Service</span>
      </h2>
      <div className="flex flex-row justify-evenly">
        <Button variant={"outlined"} onClick={handleClickOpen}>Extras</Button>
      </div>
    </>
  );
}
