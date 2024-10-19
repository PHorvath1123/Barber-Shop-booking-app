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
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        stagger: 0.2,
        scrollTrigger: {
          trigger: serviceRef.current,
          start: "top 76%",
        },
      }
    );
  });
};

export default useServiceAnimation;
