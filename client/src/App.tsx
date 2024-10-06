import { Outlet } from "react-router-dom";
import ServiceContextProvider from './hook/useServiceContext'
import { useEffect } from "react";

export default function App(){

    useEffect(() =>{
        document.title = 'Prestige Cuts'
    },[])

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