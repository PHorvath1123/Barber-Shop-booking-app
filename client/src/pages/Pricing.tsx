import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer";
import PriceList from "../components/PriceList";
import PricingStyle from "../styles/pricing/Pricing.module.css";

export default function Pricing() {

  return (
    <div className={PricingStyle.bg}>
      <Navbar></Navbar>
      <main>
        <PriceList></PriceList>
      </main>
      <Footer></Footer>
    </div>
  );
}
