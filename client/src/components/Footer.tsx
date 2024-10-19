import "../styles/main/index.css";
import Logo from "/logo.png";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import BarberIcon from "/barber_icon.png";
import QuoteBox from "/quote_box.png";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import {useRef} from 'react'
import useFooterAnimation from "../hook/animation/useFooterAnimation";

const iconStyle = {
  "&:hover": {
    color: "#EF6950",
  },
};

export default function Footer() {

  const footerRef = useRef(null);

  useFooterAnimation(footerRef)
  
  return (
    <footer ref={footerRef}>
      <div className="footer-outer-ct">
        <div className="footer-inner-ct">
          <div id="footer-content-ct" className="mb-5">
            <div id="content-title">Quick Links</div>
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
          <div id="footer-content-ct" className="mb-5">
            <div id="content-title">Legal Information</div>
            <ul className="cursor-pointer">
              <Link to={'/policy'}>Privacy Policy</Link>
            </ul>
          </div>
          <div className="footer-img">
            <img src={Logo} alt="Logo" className="w-[100px]" />
          </div>
          <div id="footer-content-ct" className="mb-5">
            <div id="content-title">Follow us</div>
            <ul className="footer-icons">
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
          <div id="footer-content-ct" className="mb-5">
            <div id="content-title">Contact</div>
            <ul>
              <li>+49 1751210432</li>
              <li>prestigecuts96@gmail.com</li>
              <li>789 Maple Avenue, Rivertown</li>
            </ul>
          </div>
        </div>
        <div className="footer-img-ct">
          <div>
            <img src={QuoteBox} alt="quote box" className="w-[200px]" />
            <p className="relative bottom-[150px] left-[15px] font-title font-bold text-lg w-[10ch] text-center">
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
