import Navbar from "../../components/ui/Navbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Footer from "../../components/Footer";
import TextInput from "../../components/ui/TextInput";
import { useState } from "react";
import Button from "../../components/ui/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Mustache from "/mustache.png";
import { z } from "zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";

const emailSchema = z
  .string()
  .email({ message: "Must be a valid email address!" });

const passwordSchema = z
  .string()
  .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z0-9\W_]+$/gm, {
    message:
      "Must contain at least one uppercase letter, a special character and one number.",
  });

type ValidationError = {
  _errors: string[];
  email?: { _errors: string[] };
  password?: { _errors: string[] };
};

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationError, setValidationError] = useState<ValidationError>();
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      localStorage.setItem("user", user.uid);
      navigate("/admin");
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
          setAuthError("Invalid email or password");
          break;
        case "auth/user-not-found":
          setAuthError("User not found");
          break;
        default:
          setAuthError("An unknown error occurred");
      }
    }
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
      handleSignIn();
    }
  };

  return (
    <>
      <main>
        <div className="relative">
          <div className="bg-gradient-to-b from-action to-dark absolute w-[100%] h-[60vh] z-[-2] min-[600px]:bg-none"></div>
          <Navbar />
          <section className="box-border bg-dark">
            <div className="flex flex-col items-center gap-5 mt-[1.5rem]">
              <AccountCircleIcon sx={{ fontSize: "50px" }}></AccountCircleIcon>
              <img src={Mustache} alt="Mustache" className="w-[80px]" />
              <h1 className="text-2xl font-title uppercase text-center relative mt-4">
                Login
              </h1>
            </div>
            <form
              className="flex flex-col items-center justify-center gap-[2rem] my-0 py-[4rem] mx-auto w-[80%] md:w-[50vw] lg:w-[30vw] xl:w-[20vw]"
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
                <p className="error-message">
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
                <p className="error-message text-center">
                  {validationError?.password._errors[0]}
                </p>
              )}
              <Button type="submit" variant="contained" size="lg">
                Login
              </Button>
              {authError && (
                <p className="error-message">{authError}</p>
              )}
            </form>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
