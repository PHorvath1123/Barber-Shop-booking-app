import { Outlet } from "react-router-dom";
import Navbar from './components/ui/Navbar'

export default function App(){
    return(
       <>
            <Navbar/>
            <main className="mt-20">
                <Outlet></Outlet>
            </main>
       </>
        
    );
};