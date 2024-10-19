import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const usePolicyAnimation = (
  policyRef: React.MutableRefObject<HTMLDivElement | null>
) => {
  
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    if (policyRef.current) {
      gsap.from(policyRef?.current.children, {
        opacity: 0,
        duration: 2,
        scrollTrigger: policyRef.current,
      });
    }
  });
};

export default usePolicyAnimation;
