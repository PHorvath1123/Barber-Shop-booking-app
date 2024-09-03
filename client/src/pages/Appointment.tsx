import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import BarberSelector from "../components/BarberSelector";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";

export default function Appointment() {
  
    return (
        <div className={AppointmentStyle.bg}>
            <Navbar></Navbar>
            <BarberSelector></BarberSelector>
            <Footer></Footer>
        </div>
    );
}
