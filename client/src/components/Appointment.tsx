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
        <article className={AppointmentStyle.margin}>
            <div className={AppointmentStyle.timeSlotOuterCt}>
                <h2 className='font-title text-lg border-b-[1px] mb-[2rem] relative top-[-20px] border-action'>Availabilities</h2>
                <ul>
                    {availableTimeSlots.map(slot => {
                        return(
                            <button onClick={() => setAppointment(slot)} key={slot}><li>{slot}</li></button>
                        );
                    })}
                </ul>
            </div>  
        </article> 
    );
};