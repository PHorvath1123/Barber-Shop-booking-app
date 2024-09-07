import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState } from "react";
import Calendar from "../components/ui/Calendar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Appointment() {
  const [barberId, setBarberId] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("");

  const queryClient = new QueryClient();

  console.log(selectedDay);
  
  return (
    <div className={AppointmentStyle.bg}>
      <Navbar />
      <BarberSelector
        selectedOption={barberId}
        setSelectedOption={setBarberId}
      />
      {barberId && (
        <QueryClientProvider client={queryClient}>
          <Calendar selectedBarberId={barberId} setSelectedDay = {setSelectedDay} />
        </QueryClientProvider>
      )}
      <Footer />
    </div>
  );
}
