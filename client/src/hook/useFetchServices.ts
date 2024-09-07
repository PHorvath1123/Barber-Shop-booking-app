import { useQuery } from "@tanstack/react-query";

type PriceType = {
    title: string;
    price: number;
  };
  
  type PriceListType = {
    category: string,
    services: PriceType[]
  };

const getServices = async (): Promise<PriceListType[]> =>{
    const response = await fetch('/api/getPriceList');
    const data: PriceListType[] = await response.json();
    return data;
};

export const useFetchServices = () => {
    return useQuery({
        queryKey: ['priceList'], 
        queryFn: () => getServices(),
        staleTime: Infinity
    });
}

