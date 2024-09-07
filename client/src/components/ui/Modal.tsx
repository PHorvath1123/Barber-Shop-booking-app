import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { colorPalette as color } from "../../utils/colorPalette";
import PricingStyle from "../../styles/pricing/Pricing.module.css";
import type { PriceListType } from "../../hook/useFetchServices";

type ModalProps = {
  type: "message" | "service" | "booking";
  content?: PriceListType[];
  open: boolean;
  onClose?: () => void;
  serviceCategory?: string;
};

const style = {
  position: "absolute" as "absolute",
  height: "fit-content",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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

const serviceContent = (serviceCategory?: string, data?: PriceListType[]) => {
  return (
    <div className="flex flex-col items-center gap-2 h-fit">
      {data?.map((category) => {
        if (category.category === serviceCategory) {
          return (
            <div key={category.category}>
              <h2
                key={category.category}
                className="mb-3 font-bold text-lg text-action"
              >
                {category.category}
              </h2>
              {category.services.map((service) => (
                <div key={service.title} className={PricingStyle.priceList}>
                  <div className={PricingStyle.listItem}>
                    <span className="text-sm">{service.title}</span>
                    <span>{service.price} $</span>
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
  onClose,
  serviceCategory,
}: ModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
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
