import ServiceBackground from "/barber_shop_scene.png";
import { useRef } from "react";
import useServiceAnimation from "../hook/animation/useServiceAnimation";

export default function Services() {
  const services = [
    {
      id: 1,
      title: "Classic Haircut",
      description:
        "Experience a precision haircut tailored to your style. Our barbers use the latest techniques to ensure you leave looking sharp and feeling great.",
    },
    {
      id: 2,
      title: "Beard Trim",
      description:
        "Keep your beard looking its best with our expert trimming and shaping services. We use high-quality tools and products for a clean, stylish finish.",
    },
    {
      id: 3,
      title: "Hot Towel Shave",
      description:
        "Enjoy a relaxing hot towel shave that leaves your skin smooth and refreshed. Our barbers provide a classic shaving experience with modern comforts.",
    },
    {
      id: 4,
      title: "Kids Haircut",
      description:
        "Our barbers are great with kids, providing fun and stylish haircuts in a comfortable environment. Perfect for children of all ages.",
    },
  ];

  const serviceRef = useRef<(HTMLDivElement | null)[]>([]);
  useServiceAnimation({ serviceRef });

  return (
    <section
      id="Services"
      className="mt-5 flex flex-col items-center justify-center overflow-x-hidden"
    >
      <div className="flex w-[100vw] justify-end">
        <img
          src={ServiceBackground}
          alt="Service title background"
          className="h-auto w-[60vw] md:mr-10 md:max-w-[50vw]"
        />
      </div>
      <div className="bg-action font-title relative top-[-30px] flex h-fit min-w-[30vw] items-center justify-center px-10 py-[.5rem] text-center text-sm font-bold uppercase md:text-lg">
        Barber Services
      </div>
      <div className="mb-[7rem] mt-[2rem] flex w-[90vw] flex-auto flex-wrap justify-center gap-8 md:mt-[5rem] md:max-w-[70vw] md:gap-[3rem]">
        {services.map((service, index) => {
          return (
            <div
              ref={(el) => (serviceRef.current[index] = el)}
              key={service.id}
              className="flex w-[40vw] flex-col md:max-w-[200px]"
            >
              <div className="bg-action text-md mb-4 flex h-[5ch] w-[5ch] items-center justify-center">
                {service.id}
              </div>
              <div className="md:text-md mb-4 text-xs font-bold uppercase">
                {service.title}
              </div>
              <p>{service.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
