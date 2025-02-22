import { useQuery } from "@tanstack/react-query";

export type bookingType = {
  date: string,
  appointment: string,
  dayName: string
  
};

const getBookings = async (barberId?: string): Promise<bookingType[]> => {
    const request = await fetch(`/api/getBookings/${barberId}`);

    if(!request.ok){
      const error = await request.json()
      throw { 
        message: error.message
      };
    }
    
    const result = await request.json();
    return result;
};

export const useGetBookedAppointments = (barberId?: string) => {
    
  return useQuery({
    queryKey: ["bookings", barberId],
    queryFn: () => getBookings(barberId),
    enabled: !!barberId,
    staleTime: Infinity
  });
};
