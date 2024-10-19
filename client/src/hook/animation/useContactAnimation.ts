import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type contactAnimationType = {
  containerRef: React.MutableRefObject<HTMLDivElement | null>;
  imageRef: React.MutableRefObject<HTMLDivElement | null>;
  subscriptionRef: React.MutableRefObject<HTMLDivElement | null>;
  formRef: React.MutableRefObject<HTMLDivElement | null>;
  contactRef: React.MutableRefObject<HTMLDivElement | null>;
};

const useContactAnimation = ({
  containerRef,
  imageRef,
  subscriptionRef,
  formRef,
  contactRef,
}: contactAnimationType) => {
    
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });

      if (subscriptionRef.current) {
        tl.fromTo(
          subscriptionRef?.current.children,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, stagger: 0.3, ease: "power2.out" }
        );
      }

      if (imageRef.current) {
        tl.fromTo(
          imageRef?.current,
          { x: -100, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 },
          "-=0.6"
        );
      }

      if (formRef.current) {
        tl.fromTo(
          formRef?.current.children,
          { y: 150, opacity: 0, scale: 0 },
          { y: 0, opacity: 1, scale: 1, duration: 0.2, stagger: 0.2 }
        );
      }

      if (contactRef.current) {
        tl.fromTo(
          contactRef?.current.children,
          { x: 200, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.1, stagger: 0.1 }
        );
      }
    },
    { scope: containerRef }
  );
};

export default useContactAnimation;
