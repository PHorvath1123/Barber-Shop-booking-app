import { Outlet } from "react-router-dom";
import ServiceContextProvider from "./hook/useServiceContext";
import { useEffect } from "react";

export default function App() {
    
  useEffect(() => {
    document.title = "Prestige Cuts";
  }, []);

  return (
    <>
      <ServiceContextProvider>
        <Outlet></Outlet>
      </ServiceContextProvider>
    </>
  );
}
