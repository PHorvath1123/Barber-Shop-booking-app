import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useFetchServices } from "../hook/useFetchServices";

export default function ServiceSelector() {
  const [service, setService] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [serviceCategory, setServiceCategory] = useState<string>("");

  const { data } = useFetchServices();

  const handleClickOpen = (category: string) => {
    setModalOpen(true);
    setServiceCategory(category);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <h2 className={AppointmentStyle.title}>
        Choose a <span className="text-action font-title">Service</span>
      </h2>
      <div className={AppointmentStyle.serviceButtons}>
        {data?.map((categories) => {
          return (
            <Button
              key={categories.category}
              variant={"outlined"}
              onClick={() => handleClickOpen(categories.category)}
            >
              {categories.category}
            </Button>
          );
        })}
        <Modal
          serviceCategory={serviceCategory}
          onClose={handleClose}
          open={modalOpen}
          content={data}
          type={"service"}
        ></Modal>
      </div>
    </>
  );
}
