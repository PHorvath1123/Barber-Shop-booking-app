import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import { useState, useEffect, useRef} from "react";
import Calendar from "../components/ui/Calendar";
import ServiceSelector from "../components/ServiceSelector";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {useServiceContext} from '../hook/useServiceContext'
import Appointment from "../components/Appointment";
import Button from '../components/ui/Button'
import BookingDetailsForm from '../components/BookingDetailsForm'
import type {formData} from '../components/BookingDetailsForm'
import BookingConfirmation from '../components/BookingConfirmation'

export type selectedDateType = {
  date: string,
  dayName: string 
};

export type selectedBarberType = {
  id: string,
  name: string,
  photo: string
};

export default function Booking() {
  const [barber, setBarber] = useState<selectedBarberType | null>(null);
  const [selectedDay, setSelectedDay] = useState<selectedDateType | null>(null);
  const {service, setService} = useServiceContext();
  const [appointment, setAppointment] = useState<string>("");
  const [bookingFormData, setBookingFormData] = useState<formData | null>(null);
  const [bookingIsSuccessful, setBookingIsSuccessful] = useState<boolean>(false);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const appointmentRef = useRef<HTMLDivElement | null>(null);
  const bookingFormRef = useRef<HTMLDivElement | null>(null); 

  // Scrolls the view to the respective section when the associated state is updated and the element is rendered.
  useEffect(() => {
    if(!barber || !selectedDay || !service || !appointment){
      if (calendarRef.current && barber) {
        calendarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      if (serviceRef.current && selectedDay) {
        serviceRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      if (appointmentRef.current && service) {
        appointmentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [barber, selectedDay, service, appointment]);

  useEffect(() =>{
    if(bookingFormRef.current){
      bookingFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  },[appointment])

  // Resets the service state when the Booking component remounts (e.g., when navigating away from the page).
  useEffect(() => {
    return () => {
      setService({title: "", price: 0}); 
      console.log('Az effect lefutott');
      
    };
  }, []);

  const queryClient = new QueryClient();

  const handleFormSubmit = (bookingData: formData) => {
    setBookingFormData(bookingData);
  };

  return (
    <section className={AppointmentStyle.bg}>
      <Navbar />
      {!bookingIsSuccessful && (
        <h1 className={AppointmentStyle.title}>Book an 
          <span className="text-action font-title"> appointment</span>
        </h1>
      )}
      <QueryClientProvider client={queryClient}>
        {!bookingIsSuccessful &&(
          <div className={AppointmentStyle.barberAndCalendarSelectorCt}>
            <BarberSelector
              selectedOption={barber}
              setSelectedOption={setBarber}
            />
            {barber && !bookingIsSuccessful &&(
              <div ref={calendarRef}>
                <Calendar
                  selectedBarber={barber}
                  setSelectedDay={setSelectedDay}
                />
              </div>
            )}
          </div> 
        )}
        {selectedDay && !bookingIsSuccessful &&(
          <div className="my-[3rem]" ref={serviceRef}>
            <ServiceSelector/>
          </div>
        )}
        {service?.title && !bookingIsSuccessful &&(
          <div ref={appointmentRef}>
            <Appointment 
              selectedBarber={barber}
              selectedDay={selectedDay}
              setAppointment={setAppointment}
              selectedAppointment={appointment}
            />
          </div> 
        )}
      </QueryClientProvider>
      {appointment && !bookingIsSuccessful &&(
        <div ref={bookingFormRef}>
          <BookingDetailsForm
            setBookingState = {setBookingIsSuccessful}
            onSubmitForm={handleFormSubmit}
          />  
        </div>
      )}
      {barber && !appointment && (
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
      <QueryClientProvider client={queryClient}>
        {bookingIsSuccessful && (
          <BookingConfirmation
            barber = {barber}
            date = {selectedDay}
            service = {service}
            appointment = {appointment}
            formData = {bookingFormData}
          />
        )}
      </QueryClientProvider>
      <Footer />
    </section>
  );
}
