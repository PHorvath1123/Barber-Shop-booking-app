import Hero from '../components/Hero';
import Services from '../components/Services';
import MeetOurBarbers from '../components/MeetOurBarbers';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home(){

    return(
        <>
           <Hero/>
           <Services/>
           <MeetOurBarbers/>
           <Contact/>
           <Footer/>
        </>
        
    );
};