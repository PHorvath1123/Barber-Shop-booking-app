import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"

export default function Navbar(){

    return(
        <header>
            <nav>
                <Link to={'/'}>Home</Link>
                <HashLink to={'/#Services'}>Services</HashLink>
                <HashLink to={'/#Barbers'}>Barbers</HashLink>
                <HashLink to={'/#Contact'}>Contact</HashLink>
                <Link to={'/pricing'}>Pricing</Link>
                <Link to={'/appointment'}>Appointment</Link>
            </nav>
        </header>
    );
};