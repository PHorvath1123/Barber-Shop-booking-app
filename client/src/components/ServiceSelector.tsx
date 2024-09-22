import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useFetchServices } from "../hook/useFetchServices";
import { useServiceContext } from "../hook/useServiceContext";

export default function ServiceSelector() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [serviceCategory, setServiceCategory] = useState<string>("");

  const { data } = useFetchServices();
  const {service} = useServiceContext();

  const handleClickOpen = (category: string) => {
    setModalOpen(true);
    setServiceCategory(category);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const serviceList = () =>{
    return(
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
          modalClose={handleClose}
          open={modalOpen}
          content={data}
          type={"service"}
        ></Modal>
      </div>
    );
  };

  const selectedService = (selectedService: string) =>{
    return(
      <>
        <div className="flex flex-col items-center mt-[2rem] gap-[1.1rem] md:flex md:justify-center">
          <span className="font-text text-xs uppercase underline">Selected service :</span>
          <p className={AppointmentStyle.selectedService}>{selectedService}</p>
        </div>
      </>
    )
  };
    
  return (
    <article className={AppointmentStyle.margin}>
      {!service &&
        <h2 className={AppointmentStyle.title}>
          Select a <span className="text-action font-title">Service</span>
        </h2> 
      }
      {!service ? serviceList() : selectedService(service)}
    </article>
  );
}
