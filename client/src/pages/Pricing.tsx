import Navbar from '../components/ui/Navbar';
import Footer from '../components/Footer';
import PriceList from '../components/PriceList'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient()

export default function Pricing(){
    return(
        <>
            <Navbar></Navbar>
            <QueryClientProvider client={queryClient}>
                <PriceList></PriceList>
            </QueryClientProvider>
            <Footer></Footer>
           
        </>
    );
};