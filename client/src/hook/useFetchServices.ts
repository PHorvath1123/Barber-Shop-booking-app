import { useQuery } from "@tanstack/react-query";

  export type PriceType = {
    title: string;
    price: number;
  };
  
  export type PriceListType = {
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

