import Navbar from "../components/ui/Navbar";
import Footer from "../components/Footer";
import PriceList from "../components/PriceList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PricingStyle from "../styles/pricing/Pricing.module.css";

const queryClient = new QueryClient();

export default function Pricing() {

  return (
    <div className={PricingStyle.bg}>
      <Navbar></Navbar>
      <main>
        <QueryClientProvider client={queryClient}>
          <PriceList></PriceList>
        </QueryClientProvider>
      </main>
      <Footer></Footer>
    </div>
  );
}
