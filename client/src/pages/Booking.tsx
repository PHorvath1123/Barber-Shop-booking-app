import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState, useEffect} from "react";
import Calendar from "../components/ui/Calendar";
import ServiceSelector from "../components/ServiceSelector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useServiceContext} from '../hook/useServiceContext'
import Appointment from "../components/Appointment";
import Button from '../components/ui/Button'
import BookingDetailsForm from '../components/BookingDetailsForm'

export type selectedDateType = {
  date: string,
  dayName: string 
};

export default function Booking() {
  const [barberId, setBarberId] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<selectedDateType | null>(null);
  const {service, setService} = useServiceContext();
  const [appointment, setAppointment] = useState<string>("");

  // Resets the service state when the Booking component remounts (e.g., when navigating away from the page).
  useEffect(() => {
    return () => {
      setService(""); 
    };
  }, []);
  
  const queryClient = new QueryClient();

  return (
    <section className={AppointmentStyle.bg}>
      <Navbar />
      <h1 className={AppointmentStyle.title}>Book an 
        <span className="text-action font-title"> appointment</span>
      </h1>
      <div className={AppointmentStyle.barberAndCalendarSelectorCt}>
        <BarberSelector
          selectedOption={barberId}
          setSelectedOption={setBarberId}
        />
        <QueryClientProvider client={queryClient}>
          {barberId &&(
            <Calendar
              selectedBarberId={barberId}
              setSelectedDay={setSelectedDay}
            />
          )}
        </QueryClientProvider>
      </div> 
      <QueryClientProvider client={queryClient}>
        {selectedDay &&(
          <ServiceSelector/>
        )}
        {service && (
          <Appointment 
            selectedBarberId={barberId}
            selectedDay={selectedDay}
            setAppointment={setAppointment}
            selectedAppointment={appointment}
          />
        )}
      </QueryClientProvider>
      {appointment && (
        <BookingDetailsForm/>
      )}
      {barberId && !appointment && (
        <div className="fixed z-10 right-[30px] bottom-[20px]">
          <Button 
            variant="contained" 
            size="sm" 
            onClick={() => {
              if(window.confirm("Are you sure you want to reset your booking to make a new one?"))
                {window.location.reload()}}}>
                  Reset booking
          </Button>
        </div>
      )}
      <Footer />
    </section>
  );
}
