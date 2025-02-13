import { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { useFetchServices } from "../hook/useFetchServices";
import { useServiceContext } from "../hook/useServiceContext";
import CircularProgressSpinner from "./ui/CircularProgressSpinner";

export default function ServiceSelector() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [serviceCategory, setServiceCategory] = useState<string>("");

  const { data, isLoading, isError, error, isSuccess } = useFetchServices();
  const { service } = useServiceContext();

  const handleClickOpen = (category: string) => {
    setModalOpen(true);
    setServiceCategory(category);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const serviceList = () => {
    if (isLoading) {
      return <CircularProgressSpinner />;
    }

    if (isError) {
      return (
        <div className="text-hoverAction mx-auto my-0 w-[80%] text-center text-lg lg:w-[50%]">
          {error.message}
        </div>
      );
    }

    if (isSuccess) {
      return (
        <div className="mx-[.5rem] mt-[3rem] flex flex-col items-center gap-[2rem] lg:mx-auto lg:my-0 lg:mt-[3rem] lg:flex lg:max-w-[50vw] lg:flex-row lg:flex-wrap lg:justify-center 2xl:max-w-[45vw]">
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
    }
  };

  const selectedService = (selectedService: string) => {
    return (
      <>
        <div className="mt-[2rem] flex flex-col items-center gap-[1.1rem] py-[2rem] md:flex md:justify-center">
          <span className="font-title border-action relative top-[-20px] mb-[2rem] border-b-[1px] text-lg">
            Service
          </span>
          <p className="text-md text-action text-center">{selectedService}</p>
        </div>
      </>
    );
  };

  return (
    <article className="mx-[1rem] box-border flex flex-col items-center justify-evenly gap-5 pb-[2rem]">
      {!service?.title && (
        <h2 className="font-title mb-[5rem] mt-[3rem] w-[100vw] text-center text-lg font-bold uppercase md:text-xl">
          Service
        </h2>
      )}
      {!service?.title ? serviceList() : selectedService(service.title)}
    </article>
  );
}
