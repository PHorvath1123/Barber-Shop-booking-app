import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { colorPalette as color } from "../../utils/colorPalette";
import PricingStyle from "../../styles/pricing/Pricing.module.css";
import type { PriceListType } from "../../hook/useFetchServices";
import AppointmentStyle from '../../styles/appointment/Appointment.module.css';
import Button from '../ui/Button';
import { useServiceContext } from "../../hook/useServiceContext";

type ModalProps = {
  type: "message" | "service" | "booking";
  content?: PriceListType[];
  open: boolean;
  modalClose?: () => void;
  serviceCategory?: string;
};

const style = {
  position: "absolute" as "absolute",
  height: "fit-content",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width:{
    'xs': '350px',
    'sm': '500px',
    'md': '800px'
  }, 
  bgcolor: "#1E1A17",
  border: `2px solid ${color.light}`,
  boxShadow: 24,
  color: color.light,
  textAlign: "center",
  p: 4,
};

const messageResponseContent = (
  <>
    <div className="flex flex-row justify-center gap-2">
      <CheckCircleOutlineIcon sx={{ color: "#EF6950" }} fontSize="large" />
      <h2 className="mb-3 font-bold text-lg">Success!</h2>
    </div>
    <div>Message sent successfully!</div>
  </>
);

const bookingContent = (
  <div className="flex flex-row justify-center gap-2">
    <CheckCircleOutlineIcon sx={{ color: "#EF6950" }} fontSize="large" />
    <h2 className="mb-3 font-bold text-lg">Success!</h2>
  </div>
);

export default function ContactModal({
  type,
  content,
  open,
  modalClose,
  serviceCategory,
}: ModalProps) {

  const {setService} = useServiceContext();

  const handleSelectService =(selectedService: string, price: number ) => {
    setService({title: selectedService, price: price});
    modalClose?.();
  };

  const serviceContent = (serviceCategory?: string, content?: PriceListType[]) => {
    return (
      <div className="flex flex-col items-center gap-2 h-fit w-[100%]">
        {content?.map((category) => {
          if (category.category === serviceCategory) {
            return (
              <div key={category.category} className="w-[100%]">
                <h2
                  key={category.category}
                  className="mb-3 font-bold text-lg text-action"
                >
                  {category.category}
                </h2>
                {category.services.map((service) => (
                  <div key={service.title} className={PricingStyle.priceList}>
                    <div className={AppointmentStyle.serviceListItem}>
                      <div className={AppointmentStyle.priceAndService}>
                        <span className="text-xs sm:text-sm">{service.title}</span>
                        <span className="text-xs">{service.price} $</span>
                      </div>
                      <div className="mb-[.3rem]">
                        <Button onClick={() => handleSelectService(service.title, service.price)} variant="outlined" size="sm">Select</Button> 
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

  return (
    <Modal open={open} onClose={modalClose} disableScrollLock={true}>
      <Box sx={style}>
        {type === "message"
          ? messageResponseContent
          : type === "service"
          ? serviceContent(serviceCategory, content)
          : type === "booking"
          ? bookingContent
          : null}
      </Box>
    </Modal>
  );
}
