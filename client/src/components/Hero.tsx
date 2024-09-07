import HomeStyle  from '../styles/home/Home.module.css'
import Logo from '/logo.png'
import Button from './ui/Button'
import { Link } from "react-router-dom";

export default function Hero(){

    return(
        <div className={HomeStyle.heroInner}>
            <img src={Logo} alt="Logo" className={HomeStyle.logo}/>
            <div className={HomeStyle.titleContainer}>
                <span className={HomeStyle.redLabels}>Since</span>
                <div className='text-xl md:text-2xl uppercase font-title font-bold my-5'>Barber Shop</div>
                <span className={HomeStyle.redLabels}>2023</span>
            </div>
            <h1 className='font-title uppercase mb-5 mt-3 text-sm text-center md:text-md'>"Where Tradition Meets Modern Style - Prestige Cuts"</h1>
            <p className='text-center text-xs w-[80vw] md:w-[40vw] mt-[1rem] mb-[4rem]'>Prestige Cuts offers a sanctuary for the modern gentleman. Our skilled barbers combine timeless techniques with the latest trends to ensure every client receives a personalized and exceptional grooming experience."</p>
            <Link to='/Appointment'><Button>Book now</Button></Link>
        </div>
        
    );
};