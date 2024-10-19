import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const useFooterAnimation = (footerRef: React.MutableRefObject<null>) => {
  
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.from(footerRef.current, {
      opacity: 0,
      duration: 0.5,
      scrollTrigger: footerRef.current,
    });
  });
};

export default useFooterAnimation;
