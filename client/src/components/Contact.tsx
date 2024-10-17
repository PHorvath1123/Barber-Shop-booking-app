import HomeStyle from "../styles/home/Home.module.css";
import Button from "./ui/Button";
import ContactBackground from "/barber_shop_vertical.png";
import TextInput from "./ui/TextInput";
import Textarea from "@mui/joy/Textarea";
import Checkbox from "@mui/joy/Checkbox";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import HomeIcon from "@mui/icons-material/Home";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useEffect, useState } from "react";
import { z } from "zod";
import { usePostMessage } from "../hook/usePostMessage";
import Modal from "./ui/Modal";
import { colorPalette as color } from "../utils/colorPalette";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";
import Backdrop from '@mui/material/Backdrop';
import CircularProgressSpinner from "./ui/CircularProgressSpinner";

const schema = z.object({
  name: z.string().regex(/^([\wöüóőúéáűí]{3,})+\s+([\wöüóőúéáűí\s]{3,})+$/gim, {
    message: "Must be the full name!",
  }),
  email: z.string().email({ message: "must be a valid email address" }),
  message: z.string().refine((val) => !/[<>]/.test(val), {
      message: "Message contains invalid characters.",
  }),
  isChecked: z.boolean(),
});

export type formData = z.infer<typeof schema>;

type ValidationError = {
  _errors: string[];
  name?: { _errors: string[] };
  email?: { _errors: string[] };
  message?: { _errors: string[] };
};

export default function Contact() {
  const [messageFormData, setMessageFormData] = useState<formData>({
    name: "",
    email: "",
    message: "",
    isChecked: false,
  });

  const [validationError, setValidationError] = useState<ValidationError>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>("");
  const { sendMessage, isSuccessful, setIsSuccessful, isError, isLoading } = usePostMessage();

  useEffect(() => {
    if (isSuccessful) {
      setIsModalOpen(true); // open the modal
      setIsSuccessful(false); // reset the success boolean to trigger the side effect for the next messages.
    }
  }, [isSuccessful]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = schema.safeParse(messageFormData); // return with an object with the successfully parsed data

    if (!result.success) {
      const errors = result.error.format();
      setValidationError(errors);

    } else {
      sendMessage(result.data);
      setMessageFormData({
        name: "",
        email: "",
        message: "",
        isChecked: false,
      }); // reset the form field values after the message sending
      setValidationError({ _errors: [] }); // reset the optionally error messages under the form fields
    }
  };
  return (
    <section
      className="relative flex flex-col items-center overflow-hidden mt-[7rem] md:mt-[10rem]"
      id="Contact"
    >
      {isModalOpen && (
        <Modal
          open={isModalOpen}
          modalClose={() => setIsModalOpen(false)}
          type="message"
          isError={isError}
        ></Modal>
      )}
      <Backdrop open= {isLoading}>
        <CircularProgressSpinner/>
      </Backdrop>
      <div className={HomeStyle.contactTitleCt}>
        <div className={HomeStyle.contactTitle}>
          <span className="text-action font-title">Contact</span> Information
        </div>
        <p className={HomeStyle.contactText}>
          Whether you have a question about our services, want to book an
          appointment, or just want to say hello, feel free to reach out to us.
        </p>
        <Link to={"/Appointment"}>
          <Button>Book now</Button>
        </Link>
        <div className="font-title text-xl mt-[3.4rem] mb-[2rem]">OR</div>
      </div>
      <img
        className={HomeStyle.contactBg}
        src={ContactBackground}
        alt="contact background"
      />
      <div className={HomeStyle.formAndInfoOuterCt}>
        <form className={HomeStyle.form} onSubmit={handleSubmit}>
          <TextInput
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, name: e.target.value }))
            }
            name="name"
            label="Full Name"
            value={messageFormData.name}
          />
          {validationError?.name && (
            <p className={HomeStyle.error}>
              {validationError?.name._errors[0]}
            </p>
          )}
          <TextInput
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, email: e.target.value }))
            }
            name="email"
            label="E-mail"
            value={messageFormData.email}
          />
          {validationError?.email && (
            <p className={HomeStyle.error}>
              {validationError?.email._errors[0]}
            </p>
          )}
          <Textarea
            minRows={3}
            placeholder="Your message..."
            variant="outlined"
            name="message"
            required
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, message: e.target.value }))
            }
            value={messageFormData.message}
            sx={{
              background: "transparent",
              border: `1px solid ${color.light}`,
              color: color.light,
              width: "100%",
              ".MuiTextarea-textarea::placeholder": {
                opacity: 1,
              },
              "--Textarea-focusedThickness": "0rem",
              "--Textarea-focusedHighlight": color.action,
              "&:focus-within": {
                borderColor: color.action,
              },
            }}
          />
          {validationError?.message && (
            <p className={HomeStyle.error}>
              {validationError?.message._errors[0]}
            </p>
          )}
          <Checkbox
            label="I agree to the terms of service and privacy policy."
            required
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, isChecked: e.target.checked }))
            }
            checked={messageFormData.isChecked}
            sx={{
              ".MuiCheckbox-checkbox.Mui-checked": {
                backgroundColor: color.action,
                color: color.light,
              },
              ".MuiCheckbox-label": {
                color: color.light,
              },
            }}
          />
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(value) => setCaptchaValue(value)}
          />
          <Button disabled={!captchaValue} type="submit">
            Send
          </Button>
        </form>
        <ul className={HomeStyle.infoList}>
          <li className="flex items-center gap-3">
            <div className={HomeStyle.circle}>
              <PhoneAndroidIcon></PhoneAndroidIcon>
            </div>
            <span>+49 1751210432</span>
          </li>
          <li className="flex items-center gap-3">
            <div className={HomeStyle.circle}>
              <MailOutlineIcon></MailOutlineIcon>
            </div>
            <span>prestigecuts23@cuts.com</span>
          </li>
          <li className="flex items-center gap-3">
            <div className={HomeStyle.circle}>
              <HomeIcon></HomeIcon>
            </div>
            <span>789 Maple Avenue, Rivertown, OH 43001, USA</span>
          </li>
          <li className="flex gap-3 items-start">
            <div className="flex items-center gap-3">
              <div className={HomeStyle.circle}>
                <QueryBuilderIcon></QueryBuilderIcon>
              </div>
            </div>
            <div className="flex flex-col">
              <span>Opening hours:</span>
              <p>Mo-Fr: 8 AM - 4 PM</p>
              <p>Sa-Su: Closed</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
