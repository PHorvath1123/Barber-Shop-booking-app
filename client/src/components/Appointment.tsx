import { useGetAppointments } from "../hook/useGetAppointments";
import { selectedDateType } from "../pages/Booking";
import { getAvailableSlots } from "../utils/checkAvailability.utils";
import { useGetBookedAppointments } from "../hook/useGetBookedAppointments";
import { selectedBarberType } from "../pages/Booking";
import CircularProgressSpinner from "./ui/CircularProgressSpinner";

type AppointmentProps = {
  selectedBarber: selectedBarberType | null;
  selectedDay: selectedDateType | null;
  setAppointment: React.Dispatch<React.SetStateAction<string>>;
  selectedAppointment: string;
};

export default function Appointment({
  selectedBarber,
  selectedDay,
  setAppointment,
  selectedAppointment,
}: AppointmentProps) {
  //Fetch the available appointments of the specified barber.
  const {
    data: availability,
    isError,
    error,
    isLoading,
  } = useGetAppointments(selectedBarber?.id, selectedDay?.dayName);

  //Fetch the booked appointments of the selected barber
  const { data: booking } = useGetBookedAppointments(selectedBarber?.id);

  const availableTimeSlots = getAvailableSlots(
    selectedDay?.date,
    selectedDay?.dayName,
    availability,
    booking ?? [],
  );

  return (
    <article className="my-[3rem]">
      <div className="mx-[1rem] mt-[2.5rem] box-border flex flex-col items-center justify-evenly gap-5 py-[4rem] md:mx-auto md:my-0 md:mt-[2.5rem] md:w-[70vw]">
        <h2 className="font-title border-action relative top-[-20px] mb-[2rem] border-b-[1px] text-lg">
          Availabilities
        </h2>
        {isLoading && <CircularProgressSpinner />}
        {isError && (
          <div className="text-hoverAction mx-auto my-0 w-[80%] text-center text-lg lg:w-[50%]">
            {error.message}
          </div>
        )}
        <ul className="flex w-[80%] flex-wrap justify-center gap-[2rem]">
          {availableTimeSlots.map((slot) => {
            return (
              <button onClick={() => setAppointment(slot)} key={slot}>
                <li
                  className={
                    selectedAppointment === slot
                      ? "bg-action border-action rounded-[30px] border px-[1.7rem] py-[.4rem] text-white"
                      : "border-action hover:bg-action rounded-[30px] border px-[1.7rem] py-[.4rem] hover:text-white"
                  }
                >
                  {slot}
                </li>
              </button>
            );
          })}
        </ul>
      </div>
    </article>
  );
}
