import summaryLogo from "/summary_logo.png";
import Scissor from "/summary_scissor.png";
import Button from "./ui/Button";
import type { selectedBarberType } from "../pages/Booking";
import type { selectedDateType } from "../pages/Booking";
import type { serviceType } from "../hook/useServiceContext";
import type { formData } from "../components/BookingDetailsForm";
import { usePostBooking } from "../hook/usePostBooking";
import Modal from "./ui/Modal";
import CircularProgressSpinner from "./ui/CircularProgressSpinner";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";

type confirmationProps = {
  barber: selectedBarberType | null;
  date: selectedDateType | null;
  service: serviceType | null;
  appointment: string;
  formData: formData | null;
};

export type bookingDataType = {
  barberId?: string;
  date?: string;
  dayName?: string;
  appointment: string;
  serviceTitle?: string;
  servicePrice?: number;
  name?: string;
  email?: string;
  phone?: string;
  comment?: string | null;
};

export default function BookingConfirmation(props: confirmationProps) {
  const bookingData = {
    barberId: props.barber?.id,
    date: props.date?.date,
    dayName: props.date?.dayName,
    appointment: props.appointment,
    serviceTitle: props.service?.title,
    servicePrice: props.service?.price,
    name: props.formData?.name,
    email: props.formData?.email,
    phone: props.formData?.phone,
    comment: props.formData?.comment,
  };

  const {
    mutateAsync: postBookingMutation,
    data: confirmedBookingResponse,
    isError,
    error,
    isSuccess,
    isPending,
  } = usePostBooking(bookingData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isError]);

  return (
    <>
      <Backdrop open={isPending}>
        <CircularProgressSpinner />
      </Backdrop>
      {isError && (
        <div className="mb-10 flex flex-col items-center gap-5">
          <div className="text-hoverAction mx-auto my-0 w-[80%] text-center text-lg lg:w-[50%]">
            {error.message
              ? error.message
              : "An error occurred during the booking process. Please refresh the page and try again!"}
          </div>
          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </div>
      )}
      {isSuccess && (
        <Modal
          type="booking"
          open={isSuccess}
          content={confirmedBookingResponse}
        />
      )}
      <section className="box-border flex flex-col items-center">
        <img src={Scissor} alt="Scissor" className="mt-[1rem] w-[150px]" />
        <h2 className="font-title mb-[5rem] mt-[3rem] w-[100vw] text-center text-lg font-bold uppercase md:text-xl">
          Booking summary
        </h2>
        <article className="relative top-[-50px] flex w-[80%] flex-col items-center gap-[2rem] md:top-0 md:flex-row md:items-center md:justify-between lg:w-[70%] xl:w-[50%]">
          <div className="flex flex-col items-center md:h-[100%]">
            <img
              className="barber-img w-[32vw] sm:max-w-[18vw] md:max-w-[160px]"
              src={props.barber?.photo}
              alt={`Photo of the barber: ${props.barber?.name}`}
            />
            <p className="font-title text-md relative top-[-60px]">
              {props.barber?.name}
            </p>
          </div>
          <div className="sm:text-md mb-[2rem] w-[100%] text-sm md:w-[35ch]">
            <ul className="flex flex-col justify-between gap-[3.5rem] md:h-[100%]">
              <li className="flex justify-between border-b-[2px] border-dotted">
                <p className="font-title font-bold">Date:</p>
                <span className="font-title">
                  {props.date?.date}
                  <span className="font-title ml-[1rem]">
                    {props.appointment}
                  </span>
                </span>
              </li>
              <li className="flex justify-between border-b-[2px] border-dotted">
                <p className="font-title font-bold">Service:</p>
                <span className="font-title">{props.service?.title}</span>
              </li>
              <li className="flex justify-between border-b-[2px] border-dotted">
                <p className="font-title font-bold">Price:</p>
                <span className="font-title">{props.service?.price} $</span>
              </li>
            </ul>
          </div>
        </article>
        <div className="border-action w-[90%] border-b-2"></div>
        <article className="mt-[2rem] flex w-[80%] flex-col lg:w-[70%] xl:w-[50%]">
          <h3 className="text-md font-title mb-[3rem] sm:text-lg">
            Customer Information
          </h3>
          <div className="flex min-w-[100%] flex-col items-center lg:items-start">
            <ul className="sm:text-md mb-[4rem] flex w-[100%] flex-col gap-[2.5rem] text-sm">
              <li className="flex justify-between gap-3 border-b-[2px] border-dotted">
                <p className="font-title whitespace-nowrap font-bold">Name:</p>
                <span className="font-title overflow-hidden text-ellipsis">
                  {props.formData?.name}
                </span>
              </li>
              <li className="flex justify-between gap-3 border-b-[2px] border-dotted">
                <p className="font-title whitespace-nowrap font-bold">
                  E-mail:
                </p>
                <span className="font-title overflow-hidden text-ellipsis">
                  {props.formData?.email}
                </span>
              </li>
              <li className="flex justify-between gap-3 border-b-[2px] border-dotted">
                <p className="font-title whitespace-nowrap font-bold">Phone:</p>
                <span className="font-title overflow-hidden text-ellipsis tracking-[.2rem]">
                  {props.formData?.phone}
                </span>
              </li>
              <li className="flex justify-between gap-3 border-b-0 border-dotted">
                <p className="font-title whitespace-nowrap font-bold">
                  Comment:
                </p>
                <span className="font-title textarea-scrollbar max-h-[150px] overflow-x-hidden overflow-y-scroll text-ellipsis hyphens-auto pl-[2rem] text-justify">
                  {props.formData?.comment}
                </span>
              </li>
            </ul>
          </div>
        </article>
        <div className="mt-[3rem] flex w-[80%] flex-row flex-wrap-reverse items-center justify-center gap-[3rem] lg:w-[40vw]">
          <Button
            type="reset"
            variant="contained"
            size="sm"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to cancel your booking?")
              ) {
                window.location.reload();
                window.scrollTo(0, 0);
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              try {
                postBookingMutation();
              } catch (e) {
                console.error(e);
              }
            }}
            type="submit"
          >
            Confirm booking
          </Button>
        </div>
        <img
          className="h-[260px] w-auto py-[3rem]"
          src={summaryLogo}
          alt="Barber decoration graphic"
        />
      </section>
    </>
  );
}
