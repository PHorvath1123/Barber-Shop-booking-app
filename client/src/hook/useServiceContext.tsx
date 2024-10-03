import { createContext, useContext, useState } from "react";

type contextProviderProps = {
  children: React.ReactNode;
};

type serviceType = {
  title: string,
  price: number
};

type contextType = {
  service: serviceType | null;
  setService: React.Dispatch<React.SetStateAction<serviceType | null>>;
};

export const serviceContext = createContext<contextType | null>(null);

export default function ServiceContextProvider({children}: contextProviderProps) {
  const [service, setService] = useState<serviceType | null>(null);

  return (
    <serviceContext.Provider
      value={{
        service,
        setService,
      }}
    >
      {children}
    </serviceContext.Provider>
  );
}

export const useServiceContext = () => {
  const context = useContext(serviceContext);
  if (!context) {
    throw new Error(
      "useServiceContext must be used within a serviceContextProvider"
    );
  }
  return context;
};
