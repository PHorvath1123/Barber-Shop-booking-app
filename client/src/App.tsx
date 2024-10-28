import { Outlet } from "react-router-dom";
import ServiceContextProvider from "./hook/useServiceContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
    
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
