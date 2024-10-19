import { useQuery } from "@tanstack/react-query";

export type Barber = {
  name: string;
  title: string;
  photo: string;
  rating: number;
  introduction: string;
  id: string;
};

const getBarbers = async (): Promise<Barber[]> => {
  const request = await fetch("/api/getBarbersToHome");

  if (!request.ok) {
    const error: Error = await request.json();
    throw {
      message: error.message,
    };
  }
  const data: Barber[] = await request.json();
  return data;
};

export const useFetchBarbers = () => {
  return useQuery({
    queryKey: ["barbers"],
    queryFn: () => getBarbers(),
    staleTime: Infinity,
  });
};
