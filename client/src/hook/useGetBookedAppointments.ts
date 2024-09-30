import { useQuery } from "@tanstack/react-query";

export type bookingType = {
  date: string,
  appointment: string,
  dayName: string
  
};
//! Kezelni az esetet, amikor egyáltalán nincs még könyvelés. Ilyenkor 404-et ad vissza.
const getBookings = async (barberId: string): Promise<bookingType[]> => {
    const request = await fetch(`/api/getBookings/${barberId}`);
    const result = await request.json();
    return result;
};

export const useGetBookedAppointments = (barberId: string) => {
    
  return useQuery({
    queryKey: ["bookings", barberId],
    queryFn: () => getBookings(barberId),
    enabled: !!barberId,
    staleTime: Infinity
  });
};
