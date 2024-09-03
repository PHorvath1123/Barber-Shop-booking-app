import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState } from 'react';
import Calendar from '../components/ui/Calendar'

export default function Appointment() {
    
    const [barberId, setBarberId] = useState<string>("");
    
    return (
        <div className={AppointmentStyle.bg}>
            <Navbar></Navbar>
            <BarberSelector selectedOption={barberId} setSelectedOption={setBarberId}></BarberSelector>
            <Calendar></Calendar>
            <Footer></Footer>
        </div>
    );
}
