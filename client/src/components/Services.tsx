import HomeStyle from "../styles/home/Home.module.css";
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
    <section id="Services" className={HomeStyle.serviceContainer}>
      <div className="flex justify-end w-[100vw]">
        <img
          src={ServiceBackground}
          alt="Service title background"
          className={HomeStyle.bg}
        />
      </div>
      <div className={HomeStyle.serviceTitle}>Barber Services</div>
      <div className={HomeStyle.serviceOptionsContainer}>
        {services.map((service, index) => {
          return (
            <div
              ref={(el) => (serviceRef.current[index] = el)}
              key={service.id}
              className={HomeStyle.serviceCard}
            >
              <div className={HomeStyle.serviceNumber}>{service.id}</div>
              <div className={HomeStyle.serviceName}>{service.title}</div>
              <p>{service.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
