import TextInput from "./ui/TextInput";
import Textarea from "@mui/joy/Textarea";
import Checkbox from "@mui/joy/Checkbox";
import { z } from "zod";
import { useState } from "react";
import { colorPalette as color } from "../utils/colorPalette";
import Button from "./ui/Button";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z.string().regex(/^([\wöüóőúéáűí]{3,})+\s+([\wöüóőúéáűí\s]{3,})+$/gim, {
    message: "Must be the full name!",
  }),
  email: z.string().email({ message: "Must be a valid email address!" }),
  phone: z.string().length(11, { message: "Must be a valid phone number!" }),
  comment: z
    .string()
    .refine((val) => !/[<>]/.test(val), {
      message: "Comment contains invalid characters.",
    }),
  isChecked: z.boolean(),
});

type BookingFormType = {
  setBookingState: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmitForm: (bookingData: formData) => void;
};

export type formData = z.infer<typeof schema>;

type ValidationError = {
  _errors: string[];
  name?: { _errors: string[] };
  email?: { _errors: string[] };
  phone?: { _errors: string[] };
  comment?: { _errors: string[] };
};

export default function BookingDetailsForm({
  setBookingState,
  onSubmitForm,
}: BookingFormType) {
  const [validationError, setValidationError] = useState<ValidationError>();

  const [bookingFormData, setBookingFormData] = useState<formData>({
    name: "",
    email: "",
    phone: "",
    comment: "",
    isChecked: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = schema.safeParse(bookingFormData);

    if (!result.success) {
      const errors = result.error.format();
      setValidationError(errors);
    } else {
      setBookingState(true);
      onSubmitForm(bookingFormData); //send the data to the Booking component
      setBookingFormData({
        name: "",
        email: "",
        phone: "",
        comment: "",
        isChecked: false,
      }); // reset the form field values after the message sending
      setValidationError({ _errors: [] }); // reset the optionally error messages under the form fields
    }
  };

  return (
    <article className="my-[3rem]">
      <div className="box-border flex flex-col items-center">
        <h2 className="font-title border-action my-[2rem] border-b-[1px] text-lg">
          Contact Information
        </h2>
        <form
          className="flex w-[80%] flex-col items-center gap-[2rem] py-[4rem] md:w-[50vw] lg:w-[30vw] xl:w-[20vw]"
          onSubmit={handleSubmit}
        >
          <TextInput
            onChange={(e) =>
              setBookingFormData((f) => ({ ...f, name: e.target.value }))
            }
            name="name"
            label="Full Name"
            value={bookingFormData.name}
          />
          {validationError?.name && (
            <p className="relative top-[-20px] text-xs text-red-400">
              {validationError?.name._errors[0]}
            </p>
          )}
          <TextInput
            onChange={(e) =>
              setBookingFormData((f) => ({ ...f, email: e.target.value }))
            }
            name="email"
            label="E-mail"
            value={bookingFormData.email}
          />
          {validationError?.email && (
            <p className="relative top-[-20px] text-xs text-red-400">
              {validationError?.email._errors[0]}
            </p>
          )}
          <TextInput
            onChange={(e) =>
              setBookingFormData((f) => ({ ...f, phone: e.target.value }))
            }
            name="phone"
            label="Phone Number"
            value={bookingFormData.phone}
            placeholder="e.g. 01751234567"
          />
          {validationError?.phone && (
            <p className="relative top-[-20px] text-xs text-red-400">
              {validationError?.phone._errors[0]}
            </p>
          )}
          <Textarea
            minRows={2}
            placeholder="Booking comment (optional)"
            variant="outlined"
            name="comment"
            onChange={(e) =>
              setBookingFormData((f) => ({ ...f, comment: e.target.value }))
            }
            value={bookingFormData.comment}
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
          {validationError?.comment && (
            <p className="relative top-[-20px] text-xs text-red-400">
              {validationError?.comment._errors[0]}
            </p>
          )}
          <div className="flex flex-row items-center gap-4">
            <Checkbox
              id="policy"
              required
              onChange={(e) =>
                setBookingFormData((f) => ({
                  ...f,
                  isChecked: e.target.checked,
                }))
              }
              checked={bookingFormData.isChecked}
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
          <div className="mt-[3rem] flex w-[80%] flex-row flex-wrap-reverse items-center justify-center gap-[3rem] lg:w-[40vw]">
            <Button
              type="reset"
              variant="contained"
              size="sm"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to reset your booking to make a new one?",
                  )
                ) {
                  window.location.reload();
                  window.scrollTo(0, 0);
                }
              }}
            >
              Reset booking
            </Button>
            <Button type="submit">Verify Booking</Button>
          </div>
        </form>
      </div>
    </article>
  );
}
