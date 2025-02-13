import BarbersTitleLogo from "/barbers-title-logo.png";
import { useFetchBarbers } from "../hook/useFetchBarbers";
import CircularProgressSpinner from "./ui/CircularProgressSpinner";
import { useRef } from "react";
import useBarberAnimation from "../hook/animation/useBarberAnimation";

export default function MeetOurBarbers() {
  const { data: barbers, error, isError, isLoading } = useFetchBarbers();

  const barberRef = useRef<(HTMLDivElement | null)[]>([]);

  useBarberAnimation(barberRef, barbers);

  return (
    <section
      id="Barbers"
      className="mb-[3rem] flex flex-col items-center overflow-x-hidden"
    >
      <div className="relative flex flex-col items-center justify-center">
        <img
          className="w-[35vw] sm:max-w-[30vw] md:max-w-[200px]"
          src={BarbersTitleLogo}
          alt="Meet our barbers title logo"
        />
        <div className="title absolute">
          Meet Our <span className="text-action font-title">Barbers</span>
        </div>
      </div>
      <p className="mt-[3rem] w-[80vw] text-center text-sm italic md:w-[65ch]">
        Get to know the skilled professionals dedicated to providing you with
        the finest grooming experience.
      </p>
      <div className="relative mt-[3rem] flex w-[85vw] flex-wrap justify-center gap-10 overflow-hidden md:w-[65vw]">
        {isLoading && <CircularProgressSpinner />}
        {isError && (
          <div className="relative top-[-30px] text-xs text-red-400">
            {error.message}
          </div>
        )}
        {barbers?.map((barber, index) => {
          return (
            <div
              key={barber.name}
              className="flex flex-col items-center gap-1 py-3"
              ref={(el) => (barberRef.current[index] = el)}
            >
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
