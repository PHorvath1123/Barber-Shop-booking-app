import { Outlet } from "react-router-dom";
import ServiceContextProvider from "./hook/useServiceContext";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
    
  useEffect(() => {
    document.title = "Prestige Cuts";
  }, []);

  const queryClient = new QueryClient();

  return (
    <>
      <ServiceContextProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet></Outlet>
        </QueryClientProvider>
      </ServiceContextProvider>
    </>
  );
}
