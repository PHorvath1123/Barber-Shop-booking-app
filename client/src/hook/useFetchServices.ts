import { useQuery } from "@tanstack/react-query";

export type PriceType = {
  title: string;
  price: number;
};

export type PriceListType = {
  category: string;
  services: PriceType[];
};

const getServices = async (): Promise<PriceListType[]> => {
  const response = await fetch("/api/getPriceList");
  const data: PriceListType[] = await response.json();

  if (!response.ok) {
    const error = await response.json();
    throw {
      message: error.message,
    };
  }
  return data;
};

export const useFetchServices = () => {
  return useQuery({
    queryKey: ["priceList"],
    queryFn: () => getServices(),
    staleTime: Infinity,
  });
};
