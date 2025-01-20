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

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <main>
        <div className="relative">
          <div className={SigninStyle.loginColorCt}></div>
          <Navbar />
          <section>
            <div className={SigninStyle.loginBg}>
              <AccountCircleIcon sx={{ fontSize: "50px" }}></AccountCircleIcon>
              <h1 className={SigninStyle.login}>Login</h1>
            </div>
            <form className={SigninStyle.form}>
              <TextInput
                name="Email"
                label="E-mail"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
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
                  {showPassword ? (
                    <VisibilityIcon/>
                  ) : (
                    <VisibilityOffIcon/>
                  )}
                </IconButton>
              </span>

              <Button type="submit" variant="contained" size="lg">
                Login
              </Button>
            </form>
          </section>
        </div>
        <Footer></Footer>
      </main>
    </>
  );
}
