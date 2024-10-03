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
        <div className={AppointmentStyle.serviceOuterCt}>
          <span className="font-title text-xl mb-[1rem] border-b-[1px] border-action">Service</span>
          <p className={AppointmentStyle.selectedService}>{selectedService}</p>
        </div>
      </>
    )
  };
    
  return (
    <article className={AppointmentStyle.serviceArticle}>
      {!service?.title &&
        <h2 className={AppointmentStyle.title}>
          Service 
        </h2> 
      }
      {!service?.title ? serviceList() : selectedService(service.title)}
    </article>
  );
}
