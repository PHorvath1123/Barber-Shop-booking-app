import Hero from "../components/Hero";
import Services from "../components/Services";
import MeetOurBarbers from "../components/MeetOurBarbers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import HomeStyle from "../styles/home/Home.module.css";
import Navbar from "../components/ui/Navbar";

export default function Home() {
  return (
    <>
      <div className={HomeStyle.heroContainer}>
        <Navbar></Navbar>
        <Hero />
      </div>
      <Services />
      <MeetOurBarbers />
      <Contact />
      <Footer />
    </>
  );
}
