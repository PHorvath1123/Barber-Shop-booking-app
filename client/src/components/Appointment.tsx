import { useGetAppointments } from '../hook/useGetAppointments';
import {generateTimeSlots} from '../utils/generateTimeSlots';
import { selectedDateType } from '../pages/Booking';
import AppointmentStyle from '../styles/appointment/Appointment.module.css'

type AppointmentProps = {
    selectedBarberId: string,
    selectedDay: selectedDateType | null
};

export default function Appointment({selectedBarberId, selectedDay}: AppointmentProps){

    const {data: availability, error, isError} = useGetAppointments(selectedBarberId, selectedDay?.dayName);

    const timeSlots = availability ? generateTimeSlots(availability) : [];

    return(
        <section>
            <h2 className={AppointmentStyle.title}>
                Choose an <span className="text-action font-title">appointment</span>
            </h2>
            <div className={AppointmentStyle.timeSlotOuterCt}>
                <ul>
                    {timeSlots.map(slot => {
                        return(
                            <button key={slot}><li>{slot}</li></button>
                        );
                    })}
                </ul>
            </div>  
        </section> 
    );
};