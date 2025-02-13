import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer";
import PriceList from "../components/PriceList";

export default function Pricing() {

  return (
    <div className="bg-[url(/background_3.png)] bg-center bg-no-repeat bg-cover bg-scroll lg:bg-fixed">
      <Navbar></Navbar>
      <main>
        <PriceList></PriceList>
      </main>
      <Footer></Footer>
    </div>
  );
}
