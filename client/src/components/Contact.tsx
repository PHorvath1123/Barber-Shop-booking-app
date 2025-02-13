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
import Backdrop from "@mui/material/Backdrop";
import CircularProgressSpinner from "./ui/CircularProgressSpinner";
import { useRef } from "react";
import useContactAnimation from "../hook/animation/useContactAnimation";

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
  const { sendMessage, isSuccessful, setIsSuccessful, isError, isLoading } =
    usePostMessage();

  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const subscriptionRef = useRef(null);
  const formRef = useRef(null);
  const contactRef = useRef(null);

  useContactAnimation({
    containerRef,
    imageRef,
    subscriptionRef,
    formRef,
    contactRef,
  });

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
      ref={containerRef}
      className="relative mt-[7rem] flex flex-col items-center overflow-hidden md:mt-[10rem]"
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
      <Backdrop open={isLoading}>
        <CircularProgressSpinner />
      </Backdrop>
      <div
        ref={subscriptionRef}
        className="flex flex-col items-center justify-center"
      >
        <div className="title">
          <span className="text-action font-title">Contact</span> Information
        </div>
        <p className="mb-[2rem] mt-[3rem] w-[80vw] text-center text-sm italic md:w-[40ch]">
          Whether you have a question about our services, want to book an
          appointment, or just want to say hello, feel free to reach out to us.
        </p>
        <Link to={"/Appointment"}>
          <Button>Book now</Button>
        </Link>
        <div className="font-title mb-[2rem] mt-[3.4rem] text-xl">OR</div>
      </div>
      <img
        ref={imageRef}
        className="hidden lg:absolute lg:left-0 lg:top-[30px] lg:-z-10 lg:ml-[1rem] lg:inline lg:w-[25vw]"
        src={ContactBackground}
        alt="contact background"
      />
      <div className="flex flex-col items-center gap-5 lg:relative lg:right-[-100px] lg:flex lg:w-[55vw] lg:flex-row lg:justify-between lg:gap-[8rem]">
        <form
          ref={formRef}
          className="mb-[3rem] flex w-[80vw] flex-col items-center gap-[2.3rem] md:max-w-[30vw]"
          onSubmit={handleSubmit}
        >
          <TextInput
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, name: e.target.value }))
            }
            name="name"
            label="Full Name"
            value={messageFormData.name}
          />
          {validationError?.name && (
            <p className="relative top-[-30px] text-xs text-red-400">
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
            <p className="relative top-[-30px] text-xs text-red-400">
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
            <p className="relative top-[-30px] text-xs text-red-400">
              {validationError?.message._errors[0]}
            </p>
          )}
          <div className="flex flex-row items-center gap-4">
            <Checkbox
              id="policy"
              required
              onChange={(e) =>
                setMessageFormData((f) => ({
                  ...f,
                  isChecked: e.target.checked,
                }))
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
            <label htmlFor="policy">
              I agree to the{" "}
              <Link
                className="text-action hover:text-hoverAction underline"
                to={"/policy"}
              >
                Privacy Policy
              </Link>{" "}
              .
            </label>
          </div>
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            onChange={(value) => setCaptchaValue(value)}
          />
          <Button disabled={!captchaValue} type="submit">
            Send
          </Button>
        </form>
        <ul
          ref={contactRef}
          className="flex w-[80vw] flex-col gap-[2rem] sm:ml-[50vw] lg:ml-0 lg:h-[100%] lg:max-w-[30vw] lg:gap-[4rem]"
        >
          <li className="flex items-center gap-3">
            <div className="bg-action circle flex min-h-[40px] min-w-[40px] items-center justify-center">
              <PhoneAndroidIcon></PhoneAndroidIcon>
            </div>
            <span>+49 1751210432</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="bg-action circle flex min-h-[40px] min-w-[40px] items-center justify-center">
              <MailOutlineIcon></MailOutlineIcon>
            </div>
            <span>prestigecuts96@cuts.com</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="bg-action circle flex min-h-[40px] min-w-[40px] items-center justify-center">
              <HomeIcon></HomeIcon>
            </div>
            <span>789 Maple Avenue, Rivertown, OH 43001, USA</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-action circle flex min-h-[40px] min-w-[40px] items-center justify-center">
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
