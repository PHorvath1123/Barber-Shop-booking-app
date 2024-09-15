import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState} from "react";
import Calendar from "../components/ui/Calendar";
import ServiceSelector from "../components/ServiceSelector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useServiceContext} from '../hook/useServiceContext'
import CustomerForm from '../components/CustomerForm'

export default function Appointment() {
  const [barberId, setBarberId] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");
  const {service} = useServiceContext();
  
  const queryClient = new QueryClient();

  return (
    <div className={AppointmentStyle.bg}>
      <Navbar />
      <BarberSelector
        selectedOption={barberId}
        setSelectedOption={setBarberId}
      />
      {barberId && (
        <QueryClientProvider client={queryClient}>
          <Calendar
            selectedBarberId={barberId}
            setSelectedDay={setSelectedDay}
          />
        </QueryClientProvider>
      )}
      {selectedDay &&(
        <QueryClientProvider client={queryClient}>
          <ServiceSelector></ServiceSelector>
        </QueryClientProvider>
      )}
    
      {/*<CustomerForm barberId={barberId} selectedDay={selectedDay} service={service}></CustomerForm> //! Test component*/}
      <Footer />
    </div>
  );
}
