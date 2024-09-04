import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState } from 'react';
import Calendar from '../components/ui/Calendar'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

export default function Appointment() {
    
    const [barberId, setBarberId] = useState<string>("");

    const queryClient = new QueryClient()
    
    return (
        <div className={AppointmentStyle.bg}>
            <Navbar/>
            <BarberSelector selectedOption={barberId} setSelectedOption={setBarberId}/>
            <QueryClientProvider client={queryClient}>
                <Calendar selectedBarberId = {barberId}/>
            </QueryClientProvider>
            <Footer/>
        </div>
    );
}
