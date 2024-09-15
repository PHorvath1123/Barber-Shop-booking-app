import { createContext, useContext, useState } from "react";

type contextProviderProps = {
  children: React.ReactNode;
};

type contextType = {
  service: string;
  setService: React.Dispatch<React.SetStateAction<string>>;
};

export const serviceContext = createContext<contextType | null>(null);

export default function ServiceContextProvider({children}: contextProviderProps) {
  const [service, setService] = useState<string>("");

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
