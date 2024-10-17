import { useGetAppointments } from "../hook/useGetAppointments";
import { selectedDateType } from "../pages/Booking";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
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
  const {
    data: booking,
    error: bookingError,
    isError: bookingIsError,
    isLoading: bookingIsLoading,
  } = useGetBookedAppointments(selectedBarber?.id);

  const availableTimeSlots = getAvailableSlots(
    selectedDay?.date,
    selectedDay?.dayName,
    availability,
    booking ?? []
  );

  return (
    <article className={AppointmentStyle.margin}>
      <div className={AppointmentStyle.timeSlotOuterCt}>
        <h2 className={AppointmentStyle.articleTitle}>Availabilities</h2>
        {(isLoading || bookingIsLoading) && <CircularProgressSpinner />}
        {isError && (
          <div className={AppointmentStyle.errorMessage}>{error.message}</div>
        )}
        {bookingIsError && (
          <div className={AppointmentStyle.errorMessage}>
            {bookingError.message}
          </div>
        )}
        <ul>
          {availableTimeSlots.map((slot) => {
            return (
              <button onClick={() => setAppointment(slot)} key={slot}>
                <li
                  className={
                    selectedAppointment === slot
                      ? "bg-action text-white"
                      : undefined
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
