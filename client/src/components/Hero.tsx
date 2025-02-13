import Logo from "/logo.png";
import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { useRef } from "react";
import useHeroAnimation from "../hook/animation/useHeroAnimation";

export default function Hero() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useHeroAnimation({
    containerRef,
    logoRef,
    titleRef,
    subtitleRef,
    descriptionRef,
    buttonRef,
  });

  return (
    <div
      ref={containerRef}
      className="mx-[1rem] mb-[3rem] flex h-fit flex-col items-center overflow-x-hidden"
    >
      <img
        ref={logoRef}
        src={Logo}
        alt="Logo"
        className="w-[50vw] sm:w-[300px] md:w-[320px]"
      />
      <div
        ref={titleRef}
        className="my-3 flex items-center justify-between gap-[4rem] xl:w-[63vw]"
      >
        <span className="red-label">Since</span>
        <div className="font-title my-5 text-xl font-bold uppercase md:text-2xl">
          Barber Shop
        </div>
        <span className="red-label">2023</span>
      </div>
      <h1
        ref={subtitleRef}
        className="font-title md:text-md mb-5 mt-3 text-center text-sm uppercase"
      >
        "Where Tradition Meets Modern Style - Prestige Cuts"
      </h1>
      <p
        ref={descriptionRef}
        className="mb-[4rem] mt-[1rem] w-[80vw] text-center text-xs md:w-[40vw]"
      >
        Prestige Cuts offers a sanctuary for the modern gentleman. Our skilled
        barbers combine timeless techniques with the latest trends to ensure
        every client receives a personalized and exceptional grooming
        experience.
      </p>
      <Link ref={buttonRef} className="box" to="/Appointment">
        <Button>Book now</Button>
      </Link>
    </div>
  );
}
