import Hero from "../components/Hero";
import Services from "../components/Services";
import MeetOurBarbers from "../components/MeetOurBarbers";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import HomeStyle from "../styles/home/Home.module.css";
import Navbar from "../components/ui/Navbar";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Home() {

  useEffect(() => {
    window.scrollTo(0,0);
  }, [])

  const queryClient = new QueryClient();

  return (
    <>
      <div className={HomeStyle.heroContainer}>
        <Navbar></Navbar>
        <Hero />
      </div>
      <Services />
      <QueryClientProvider client={queryClient}>
        <MeetOurBarbers />
      </QueryClientProvider>
      <Contact />
      <Footer />
    </>
  );
}
