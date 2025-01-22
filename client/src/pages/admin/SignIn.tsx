import Navbar from "../../components/ui/Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SigninStyle from "../../styles/admin/signin/SignIn.module.css";
import Footer from "../../components/Footer";
import TextInput from "../../components/ui/TextInput";
import { useState } from "react";
import Button from "../../components/ui/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Mustache from "/mustache.png";
import { z } from "zod";
import AppointmentStyle from "../../styles/appointment/Appointment.module.css";

const emailSchema = z
  .string()
  .email({ message: "Must be a valid email address!" });

const passwordSchema = z
  .string()
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]+$/gm, {
    message: "Must contain at least one uppercase letter and one number.",
  });

type ValidationError = {
  _errors: string[];
  email?: { _errors: string[] };
  password?: { _errors: string[] };
};

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<ValidationError>();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailIsValid = emailSchema.safeParse(email);
    const passwordIsValid = passwordSchema.safeParse(password);

    setValidationError({
      _errors: [],
      email: emailIsValid.success
        ? undefined
        : { _errors: emailIsValid.error.format()._errors },
      password: passwordIsValid.success
        ? undefined
        : { _errors: passwordIsValid.error.format()._errors },
    });

    if (emailIsValid.success && passwordIsValid.success) {
      setEmail("");
      setPassword("");
      setValidationError({ _errors: [] });
    }
  };

  return (
    <>
      <main>
        <div className="relative">
          <div className={SigninStyle.loginColorCt}></div>
          <Navbar />
          <section className={SigninStyle.loginOuterCt}>
            <div className={SigninStyle.loginBg}>
              <AccountCircleIcon sx={{ fontSize: "50px" }}></AccountCircleIcon>
              <img src={Mustache} alt="Mustache" className="w-[80px]" />
              <h1 className={SigninStyle.login}>Login</h1>
            </div>
            <form
              className={SigninStyle.form}
              onSubmit={(e) => handleSubmit(e)}
            >
              <TextInput
                name="Email"
                label="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              {validationError?.email && (
                <p className={AppointmentStyle.error}>
                  {validationError?.email._errors[0]}
                </p>
              )}
              <span className="w-[100%] relative mb-5">
                <TextInput
                  name="Password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <IconButton
                  sx={{
                    color: "white",
                    position: "absolute",
                    width: "fit-content",
                    right: "-1px",
                    top: "10px",
                  }}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </span>
              {validationError?.password && (
                <p className={AppointmentStyle.error}>
                  {validationError?.password._errors[0]}
                </p>
              )}
              <Button type="submit" variant="contained" size="lg">
                Login
              </Button>
            </form>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
