import "../styles/theme.css";
import Logo from "/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import BarberIcon from "/barber_icon.png";
import QuoteBox from "/quote_box.png";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import { useRef } from "react";

const iconStyle = {
  "&:hover": {
    color: "#EF6950",
  },
};

export default function Footer() {
  const footerRef = useRef(null);

  return (
    <footer
      className="mb-[.5rem] mt-[8rem] flex flex-col items-center overflow-x-hidden text-xs"
      ref={footerRef}
    >
      <div className="mb-[2rem] flex w-[80vw] items-center justify-between gap-2">
        <div className="flex w-fit flex-col items-start gap-2 lg:flex lg:w-[90vw] lg:flex-row lg:justify-between lg:gap-5">
          <div className="mb-5 flex flex-col gap-2">
            <div className="text-xs font-bold uppercase">Quick Links</div>
            <div className="flex flex-col">
              <HashLink
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Home
              </HashLink>
              <HashLink to="/#Services">Services</HashLink>
              <HashLink to="/#Barbers">Barbers</HashLink>
              <HashLink to="/#Contact">Contact</HashLink>
              <Link to="/Appointment">Book appointment</Link>
            </div>
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <div className="text-xs font-bold uppercase">Legal Information</div>
            <ul className="cursor-pointer">
              <Link to={"/policy"}>Privacy Policy</Link>
            </ul>
          </div>
          <div className="hidden md:hidden lg:order-none lg:inline lg:w-fit">
            <img
              src={Logo}
              alt="Logo"
              className="w-[100px] min-w-[150px] xl:w-[200px]"
            />
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <div className="text-xs font-bold uppercase">Follow us</div>
            <ul className="flex gap-5">
              <li>
                <a href="">
                  <FacebookIcon sx={iconStyle} />
                </a>
              </li>
              <li>
                <a href="">
                  <InstagramIcon sx={iconStyle} />
                </a>
              </li>
              <li>
                <a href="">
                  <TwitterIcon sx={iconStyle} />
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-5 flex flex-col gap-2">
            <div className="text-xs font-bold uppercase">Contact</div>
            <ul>
              <li>+49 1751210432</li>
              <li>prestigecuts96@gmail.com</li>
              <li>789 Maple Avenue, Rivertown</li>
            </ul>
          </div>
        </div>
        <div className="hidden sm:flex sm:h-auto sm:flex-col sm:items-center sm:gap-[1rem] lg:hidden">
          <div>
            <img src={QuoteBox} alt="quote box" className="w-[200px]" />
            <p className="font-title relative bottom-[150px] left-[15px] w-[10ch] text-center text-lg font-bold">
              Where Style Meets Precision.
            </p>
          </div>
          <div>
            <img src={BarberIcon} alt="Barber icon" className="w-[200px]" />
          </div>
        </div>
      </div>
      <div>PH Design / Prestige Cuts 2023 &copy; All rights reserved</div>
    </footer>
  );
}
