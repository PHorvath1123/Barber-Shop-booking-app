import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState } from 'react';

export default function Appointment() {
    
    const [barberId, setBarberId] = useState<string>("");
    
    return (
        <div className={AppointmentStyle.bg}>
            <Navbar></Navbar>
            <BarberSelector selectedOption={barberId} setSelectedOption={setBarberId}></BarberSelector>
            <Footer></Footer>
        </div>
    );
}
