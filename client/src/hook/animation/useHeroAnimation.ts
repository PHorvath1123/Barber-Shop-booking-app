import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type heroAnimationType = {
  containerRef: React.MutableRefObject<null>;
  logoRef: React.MutableRefObject<null>;
  titleRef: React.MutableRefObject<null>;
  subtitleRef: React.MutableRefObject<null>;
  descriptionRef: React.MutableRefObject<null>;
  buttonRef: React.MutableRefObject<null>;
};

const useHeroAnimation = ({
  containerRef,
  logoRef,
  titleRef,
  subtitleRef,
  descriptionRef,
  buttonRef,
}: heroAnimationType) => {
  
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 }
      );

      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.5"
      );

      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );

      tl.fromTo(
        descriptionRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      );

      tl.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 },
        "-=0.3"
      );
    },
    { scope: containerRef }
  );
};

export default useHeroAnimation;
