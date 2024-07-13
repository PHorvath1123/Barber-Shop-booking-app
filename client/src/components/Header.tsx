import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link"

export default function Header(){

    return(
        <header>
            <nav>
                <Link to={'/'}>Home</Link>
                <Link to={'/appointment'}>Appointment</Link>
                <Link to={'/pricing'}>Pricing</Link>
                <HashLink to={'/#Services'}>Services</HashLink>
            </nav>
        </header>
    );
};