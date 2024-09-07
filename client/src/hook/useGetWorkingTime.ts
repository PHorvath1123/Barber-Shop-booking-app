import { useQuery } from "@tanstack/react-query";

type daysType = {
  day: string;
  open: string;
  close: string;
};

const getDays = async (barberId: string): Promise<daysType[]> => {
  const request = await fetch(`/api/getAvailabilities/${barberId}`);
  const result = await request.json();
  console.log('A query lefutott');
  
  return result;
};

export const useGetWorkingTime = (barberId: string) => {
    
  return useQuery({
    queryKey: ["availableDays", barberId],
    queryFn: () => getDays(barberId),
    enabled: !!barberId,
    staleTime: Infinity
  });
};


