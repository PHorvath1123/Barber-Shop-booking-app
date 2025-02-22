import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import { useState, useEffect, useRef } from "react";
import Calendar from "../components/ui/Calendar";
import ServiceSelector from "../components/ServiceSelector";
import { useServiceContext } from "../hook/useServiceContext";
import Appointment from "../components/Appointment";
import Button from "../components/ui/Button";
import BookingDetailsForm from "../components/BookingDetailsForm";
import type { formData } from "../components/BookingDetailsForm";
import BookingConfirmation from "../components/BookingConfirmation";

export type selectedDateType = {
  date: string;
  dayName: string;
};

export type selectedBarberType = {
  id: string;
  name: string;
  photo: string;
};

export default function Booking() {
  const [barber, setBarber] = useState<selectedBarberType | null>(null);
  const [selectedDay, setSelectedDay] = useState<selectedDateType | null>(null);
  const {service, setService } = useServiceContext();
  const [appointment, setAppointment] = useState<string>("");
  const [bookingFormData, setBookingFormData] = useState<formData | null>(null);
  const [bookingIsSuccessful, setBookingIsSuccessful] = useState<boolean>(false);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const serviceRef = useRef<HTMLDivElement | null>(null);
  const appointmentRef = useRef<HTMLDivElement | null>(null);
  const bookingFormRef = useRef<HTMLDivElement | null>(null);

  // Scrolls the view to the respective section when the associated state is updated and the element is rendered.
  useEffect(() => {
    setTimeout(() => {
      if (!barber || !selectedDay || !service || !appointment) {
        if (calendarRef.current && barber) {
          calendarRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }

        if (serviceRef.current && selectedDay) {
          serviceRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }

        if (appointmentRef.current && service) {
          appointmentRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    }, 200);
  }, [barber, selectedDay, service, appointment]);

  useEffect(() => {
    if (bookingFormRef.current) {
      bookingFormRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [appointment]);

  // Resets the service and the appointment state when the Booking component remounts or the selected day is changed.
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      setService({ title: "", price: 0 });
      setAppointment("");
    };
  }, [selectedDay]);

  const handleFormSubmit = (bookingData: formData) => {
    setBookingFormData(bookingData);
  };

  return (
    <div className="bg-[url(/background_2.png)] bg-center bg-no-repeat bg-cover bg-scroll lg:bg-fixed">
      <Navbar />
      <main>
        <section>
          {!bookingIsSuccessful ? (
            <>
              <h1 className="text-lg font-title uppercase font-bold text-center w-[100vw] mt-[3rem] mb-[5rem] md:text-xl">
                Book an
                <span className="text-action font-title"> appointment</span>
              </h1>
              <div
                ref={calendarRef}
                className="flex flex-col pb-[2rem] sm:box-border lg:flex lg:flex-row lg:justify-evenly lg:items-center lg:mt-[5rem] lg:py-[3rem]"
              >
                <BarberSelector
                  selectedOption={barber}
                  setSelectedOption={setBarber}
                />
                {barber && (
                  <div>
                    <Calendar
                      selectedBarber={barber}
                      setSelectedDay={setSelectedDay}
                    />
                  </div>
                )}
              </div>
              {selectedDay && (
                <div className="my-[3rem] flex flex-col items-center" ref={serviceRef}>
                  <ServiceSelector />
                </div>
              )}
              {service?.title && (
                <div ref={appointmentRef}>
                  <Appointment
                    selectedBarber={barber}
                    selectedDay={selectedDay}
                    setAppointment={setAppointment}
                    selectedAppointment={appointment}
                  />
                </div>
              )}
              {appointment && (
                <div ref={bookingFormRef}>
                  <BookingDetailsForm
                    setBookingState={setBookingIsSuccessful}
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
                      if (
                        window.confirm(
                          "Are you sure you want to reset your booking to make a new one?"
                        )
                      ) {
                        window.location.reload();
                      }
                    }}
                  >
                    Reset booking
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              <BookingConfirmation
                barber={barber}
                date={selectedDay}
                service={service}
                appointment={appointment}
                formData={bookingFormData}
              />
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
