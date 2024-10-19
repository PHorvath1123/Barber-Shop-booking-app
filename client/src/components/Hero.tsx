import HomeStyle from "../styles/home/Home.module.css";
import Logo from "/logo.png";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { useRef } from 'react'
import useHeroAnimation from "../hook/animation/useHeroAnimation";

export default function Hero() {

  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useHeroAnimation({containerRef, logoRef, titleRef, subtitleRef, descriptionRef, buttonRef});

  return (
    <div ref={containerRef} className={HomeStyle.heroInner}>
      <img ref={logoRef} src={Logo} alt="Logo" className={HomeStyle.logo} />
      <div ref={titleRef} className={HomeStyle.titleContainer}>
        <span className={HomeStyle.redLabels}>Since</span>
        <div  className="text-xl md:text-2xl uppercase font-title font-bold my-5">
          Barber Shop
        </div>
        <span className={HomeStyle.redLabels}>2023</span>
      </div>
      <h1 ref={subtitleRef} className="font-title uppercase mb-5 mt-3 text-sm text-center md:text-md">
        "Where Tradition Meets Modern Style - Prestige Cuts"
      </h1>
      <p ref={descriptionRef} className="text-center text-xs w-[80vw] md:w-[40vw] mt-[1rem] mb-[4rem]">
        Prestige Cuts offers a sanctuary for the modern gentleman. Our skilled
        barbers combine timeless techniques with the latest trends to ensure
        every client receives a personalized and exceptional grooming
        experience."
      </p>
      <Link ref={buttonRef} className="box" to="/Appointment">
        <Button>Book now</Button>
      </Link>
    </div>
  );
}
