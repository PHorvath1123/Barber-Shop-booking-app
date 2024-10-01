import TextInput from "./ui/TextInput";
import Textarea from "@mui/joy/Textarea";
import Checkbox from "@mui/joy/Checkbox";
import { z } from "zod";
import { useState } from "react";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { colorPalette as color } from "../utils/colorPalette";

const schema = z.object({
  name: z.string(),
  email: z.string().email({ message: "must be a valid email address" }),
  phone: z.string().length(11),
  comment: z.string(),
  isChecked: z.boolean(),
});

type formData = z.infer<typeof schema>;

type ValidationError = {
  _errors: string[];
  email?: { _errors: string[] };
};

export default function BookingDetailsForm() {
  const [messageFormData, setMessageFormData] = useState<formData>({
    name: "",
    email: "",
    phone: "",
    comment: "",
    isChecked: false,
  });

  return (
    <article className={AppointmentStyle.margin}>
      <div className={AppointmentStyle.formOuterCt}>
        <h2 className="font-title text-lg border-b-[1px] my-[2rem] border-action">
          Contact Information
        </h2>
        <form className={AppointmentStyle.form}>
          <TextInput
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, name: e.target.value }))
            }
            name="name"
            label="Full Name"
            value={messageFormData.name}
          />
          <TextInput
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, email: e.target.value }))
            }
            name="email"
            label="E-mail"
            value={messageFormData.email}
          />
          <TextInput
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, phone: e.target.value }))
            }
            name="phone"
            label="Phone Number"
            value={messageFormData.phone}
            placeholder="e.g. 01751234567"
          />
          <Textarea
            minRows={2}
            placeholder="Booking comment (optional)"
            variant="outlined"
            name="comment"
            required
            onChange={(e) =>
              setMessageFormData((f) => ({ ...f, comment: e.target.value }))
            }
            value={messageFormData.comment}
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
        </form>
      </div>
    </article>
  );
}
