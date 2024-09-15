import { useGetAppointments } from '../hook/useGetAppointments';
import generateTimeSlots from '../utils/generateTimeSlots';
import { selectedDateType } from '../pages/Booking';

type AppointmentProps = {
    selectedBarberId: string,
    selectedDay: selectedDateType | null
};

export default function Appointment({selectedBarberId, selectedDay}: AppointmentProps){

    const {
        data: availability,
        isLoading,
        isError,
        error,
      } = useGetAppointments(selectedBarberId, selectedDay?.dayName);

    generateTimeSlots(availability)

    return(
        <div>
         Appointment
        </div>
    );
};