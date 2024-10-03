import { useGetAppointments } from '../hook/useGetAppointments';
import { selectedDateType } from '../pages/Booking';
import AppointmentStyle from '../styles/appointment/Appointment.module.css';
import { getAvailableSlots } from '../utils/checkAvailability.utils';
import { useGetBookedAppointments } from '../hook/useGetBookedAppointments';
import {selectedBarberType} from '../pages/Booking'

type AppointmentProps = {
    selectedBarber: selectedBarberType | null,
    selectedDay: selectedDateType | null,
    setAppointment: React.Dispatch<React.SetStateAction<string>>,
    selectedAppointment: string
};

export default function Appointment({selectedBarber, selectedDay, setAppointment, selectedAppointment}: AppointmentProps){

    const {data: availability} = useGetAppointments(selectedBarber?.id, selectedDay?.dayName);
    const {data: booking} = useGetBookedAppointments(selectedBarber?.id);
    const availableTimeSlots = getAvailableSlots(selectedDay?.date, selectedDay?.dayName, availability, booking ?? []);
   
    
    return(
        <article className={AppointmentStyle.margin}>
            <div className={AppointmentStyle.timeSlotOuterCt}>
                <h2 className='font-title text-lg border-b-[1px] mb-[2rem] relative top-[-20px] border-action'>Availabilities</h2>
                <ul>
                    {availableTimeSlots.map(slot => {
                        return(
                            <button 
                                onClick={() => setAppointment(slot)} 
                                key={slot}>
                                    <li className={selectedAppointment === slot ? 'bg-action text-white' : undefined}>
                                        {slot}
                                    </li>
                            </button>
                        );
                    })}
                </ul>
            </div>  
        </article> 
    );
};