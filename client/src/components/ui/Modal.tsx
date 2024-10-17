import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { colorPalette as color } from "../../utils/colorPalette";
import PricingStyle from "../../styles/pricing/Pricing.module.css";
import type { PriceListType } from "../../hook/useFetchServices";
import AppointmentStyle from "../../styles/appointment/Appointment.module.css";
import Button from "../ui/Button";
import { useServiceContext } from "../../hook/useServiceContext";
import type { BookingResponseType } from "../../hook/usePostBooking";
import { Link } from "react-router-dom";

type ModalProps =
  | {
      type: "message";
      content?: string;
      open: boolean;
      modalClose?: () => void;
      serviceCategory?: string;
      isError: boolean;
    }
  | {
      type: "service";
      content?: PriceListType[];
      open: boolean;
      modalClose?: () => void;
      serviceCategory?: string;
      isError?: boolean;
    }
  | {
      type: "booking";
      content?: BookingResponseType;
      open: boolean;
      modalClose?: () => void;
      serviceCategory?: string;
      isError?: boolean;
    };

const style = {
  position: "absolute" as "absolute",
  maxHeight: "90vh",
  overflowY: "scroll",
  overflowX: "hidden",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "350px",
    sm: "500px",
    md: "800px",
  },
  bgcolor: "#1E1A17",
  border: `2px solid ${color.light}`,
  boxShadow: 24,
  color: color.light,
  textAlign: "center",
  p: 4,
};

export default function ContactModal({
  type,
  content,
  open,
  modalClose,
  serviceCategory,
  isError,
}: ModalProps) {
  const { setService } = useServiceContext();

  const handleSelectService = (selectedService: string, price: number) => {
    setService({ title: selectedService, price: price });
    modalClose?.();
  };

  const serviceContent = (
    serviceCategory?: string,
    content?: PriceListType[]
  ) => {
    return (
      <div className="flex flex-col items-center gap-2 h-fit w-[100%]">
        {content?.map((category) => {
          if (category.category === serviceCategory) {
            return (
              <div key={category.category} className="w-[100%]">
                <h2
                  key={category.category}
                  className="mb-[3rem] font-bold text-lg text-action"
                >
                  {category.category}
                </h2>
                {category.services.map((service) => (
                  <div key={service.title} className={PricingStyle.priceList}>
                    <div className={AppointmentStyle.serviceListItem}>
                      <div className={AppointmentStyle.priceAndService}>
                        <span className="text-xs sm:text-sm">
                          {service.title}
                        </span>
                        <span className="text-xs">{service.price} $</span>
                      </div>
                      <div className="mb-[.3rem]">
                        <Button
                          onClick={() =>
                            handleSelectService(service.title, service.price)
                          }
                          variant="outlined"
                          size="sm"
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
        })}
      </div>
    );
  };

  const bookingContent = (content?: BookingResponseType) => {
    return (
      <article className="flex flex-col items-center gap-2 w-[85%] lg:w-[70%] my-0 mx-auto">
        <div className="flex justify-center items-center gap-2">
          <CheckCircleOutlineIcon sx={{ color: "#EF6950" }} fontSize="large" />
          <h2 className="font-bold text-md md:text-lg">Booking Confirmed!</h2>
        </div>
        <div className="text-sm md:text-md flex flex-col text-left gap-7 hyphens-auto my-10">
          <p>Thank you for your booking!</p>
          <p>
            We are pleased to confirm your appointment on{" "}
            <strong className="text-action">
              {content?.dayName}, {content?.date}
            </strong>{" "}
            at
            <strong className="text-action"> {content?.appointment}</strong>.
          </p>
          <p>We look forward to welcoming you to our salon.</p>
          <p className="hyphens-auto text-justify">
            Please arrive a few minutes before your appointment to ensure
            everything goes smoothly. Should you need to make any changes, feel
            free to contact us in advance.
          </p>
        </div>
        <p className="text-lg mb-7">See you soon!</p>
        <div>
          <Link to={"/"}>
            <Button>Return to Homepage</Button>
          </Link>
        </div>
      </article>
    );
  };

  const messageResponseContent = (isError: boolean) => {
    return (
      <>
        {!isError ? (
          <>
            <div className="flex flex-row justify-center gap-2">
              <CheckCircleOutlineIcon
                sx={{ color: "#EF6950" }}
                fontSize="large"
              />
              <h2 className="mb-3 font-bold text-lg">Success!</h2>
            </div>
            <div>Message sent successfully!</div>
          </>
        ) : (
          <div className={PricingStyle.errorMessage}>
            "Could not send the message. Please try again!"
          </div>
        )}
      </>
    );
  };

  return (
    <Modal open={open} onClose={modalClose} disableScrollLock={true}>
      <Box sx={style}>
        {type === "message"
          ? messageResponseContent(isError)
          : type === "service"
          ? serviceContent(serviceCategory, content)
          : type === "booking"
          ? bookingContent(content)
          : null}
      </Box>
    </Modal>
  );
}
