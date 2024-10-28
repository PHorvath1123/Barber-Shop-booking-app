import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type serviceAnimationType = {
  serviceRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
};

const useServiceAnimation = ({ serviceRef }: serviceAnimationType) => {
  
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.fromTo(
      serviceRef.current,
      { scale: 0, opacity: 0, y: -200 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.7,
        scrollTrigger: {
          trigger: serviceRef.current,
          start: "top 76%",
        },
      }
    );
  });
};

export default useServiceAnimation;
