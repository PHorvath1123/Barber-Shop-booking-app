import Hero from "../components/Hero";
import Services from "../components/Services";
import MeetOurBarbers from "../components/MeetOurBarbers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/ui/Navbar";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar withBackground />
      <main>
        <div className="overflow-x-hidden bg-[url(/background.png)] bg-auto bg-fixed bg-center bg-no-repeat">
          <Hero />
        </div>
        <Services />
        <MeetOurBarbers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
