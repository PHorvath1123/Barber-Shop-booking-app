import BarbersTitleLogo from "/barbers-title-logo.png";
import HomeStyle from "../styles/home/Home.module.css";
import { useFetchBarbers } from "../hook/useFetchBarbers";
import CircularProgressSpinner from "./ui/CircularProgressSpinner";
import {useRef} from 'react'
import useBarberAnimation from "../hook/animation/useBarberAnimation";

export default function MeetOurBarbers() {
  const { data: barbers, error, isError, isLoading } = useFetchBarbers();

  const barberRef = useRef<(HTMLDivElement | null)[]>([]);

  useBarberAnimation(barberRef, barbers)

  return (
    <section
      id="Barbers"
      className="flex flex-col items-center mb-[3rem] overflow-x-hidden "
    >
      <div className="flex flex-col justify-center items-center relative">
        <img
          className={HomeStyle.titleLogo}
          src={BarbersTitleLogo}
          alt="Meet our barbers title logo"
        />
        <div className={HomeStyle.barberTitle}>
          Meet Our <span className="text-action font-title">Barbers</span>
        </div>
      </div>
      <p className={HomeStyle.barberText}>
        Get to know the skilled professionals dedicated to providing you with
        the finest grooming experience.
      </p>
      <div className={HomeStyle.BarbersCt}>
        {isLoading && 
          <CircularProgressSpinner/>
        }
        {isError && (
          <div className={HomeStyle.errorMessage}>{error.message}</div>
        )}
        {barbers?.map((barber, index) => {
          return (
            <div key={barber.name} className={HomeStyle.barberInnerCt} ref={(el) => barberRef.current[index] = el}>
              <img
                src={barber.photo}
                alt="Barber1"
                className="w-[26vw] sm:max-w-[18vw] md:max-w-[110px]"
              />
              <div className="text-action">{barber.name}</div>
              <div id="barberTitle">{barber.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
