import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import type { Barber } from "../useFetchBarbers";

const useBarberAnimation = (
  barberRef: React.MutableRefObject<(HTMLDivElement | null)[]>,
  barbers: Barber[] | undefined
) => {
  
  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(
      barberRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: barberRef.current,
          start: "top 76%",
        },
      }
    );
  }, [barbers]);
};

export default useBarberAnimation;
