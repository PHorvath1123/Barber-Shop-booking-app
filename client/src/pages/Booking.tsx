import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState} from "react";
import Calendar from "../components/ui/Calendar";
import ServiceSelector from "../components/ServiceSelector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useServiceContext} from '../hook/useServiceContext'
import Appointment from "../components/Appointment";

export type selectedDateType = {
  date: string,
  dayName: string 
};

export default function Booking() {
  const [barberId, setBarberId] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<selectedDateType | null>(null);
  const {service} = useServiceContext();
  const [appointment, setAppointment] = useState<string>("");
  
  const queryClient = new QueryClient();

  return (
    <section className={AppointmentStyle.bg}>
      <Navbar />
      <BarberSelector
        selectedOption={barberId}
        setSelectedOption={setBarberId}
      />
      <QueryClientProvider client={queryClient}>
        {barberId &&(
          <ServiceSelector/>
        )}
        {service &&(
          <Calendar
            selectedBarberId={barberId}
            setSelectedDay={setSelectedDay}
          />
        )}
        {selectedDay && (
          <Appointment 
            selectedBarberId={barberId}
            selectedDay={selectedDay}
            setAppointment={setAppointment}
          />
        )}
      </QueryClientProvider>
      <Footer />
    </section>
  );
}
