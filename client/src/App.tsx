import { Outlet } from "react-router-dom";
import ServiceContextProvider from './hook/useServiceContext'

export default function App(){
    return(
       <>
            <main>
                <ServiceContextProvider>
                    <Outlet></Outlet>
                </ServiceContextProvider>
            </main>
       </>
        
    );
};