import { useGetAppointments } from '../hook/useGetAppointments';
import { selectedDateType } from '../pages/Booking';
import AppointmentStyle from '../styles/appointment/Appointment.module.css';
import { getAvailableSlots } from '../utils/checkAvailability.utils';
import { useGetBookedAppointments } from '../hook/useGetBookedAppointments';

type AppointmentProps = {
    selectedBarberId: string,
    selectedDay: selectedDateType | null,
    setAppointment: React.Dispatch<React.SetStateAction<string>>
};

export default function Appointment({selectedBarberId, selectedDay, setAppointment}: AppointmentProps){

    const {data: availability} = useGetAppointments(selectedBarberId, selectedDay?.dayName);
    const {data: booking} = useGetBookedAppointments(selectedBarberId);
    const availableTimeSlots = getAvailableSlots(selectedDay?.date, selectedDay?.dayName, availability, booking ?? []);

    return(
        <section>
            <h2 className={AppointmentStyle.title}>
                Choose an <span className="text-action font-title">appointment</span>
            </h2>
            <div className={AppointmentStyle.timeSlotOuterCt}>
                <ul>
                    {availableTimeSlots.map(slot => {
                        return(
                            <button onClick={() => setAppointment(slot)} key={slot}><li>{slot}</li></button>
                        );
                    })}
                </ul>
            </div>  
        </section> 
    );
};