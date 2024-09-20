import { useQuery } from "@tanstack/react-query";
import type {daysType} from './useGetWorkingTime'

const getAppointments = async (barberId: string, selectedDay?: string): Promise<daysType> => {
  const request = await fetch(`/api/getAvailabilities/${barberId}/${selectedDay}`);
  const result = await request.json();
  return result;
};

export const useGetAppointments = (barberId: string, selectedDay?: string)  => {
    
  return useQuery({
    queryKey: ["availableAppointments", barberId, selectedDay],
    queryFn: () => getAppointments(barberId, selectedDay),
    enabled: !!barberId && !!selectedDay,
    staleTime: Infinity
  });
};

