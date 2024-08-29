import PricingStyle from '../styles/pricing/Pricing.module.css';
import {useQuery} from '@tanstack/react-query';

type PriceType = {
    title: string;
    price: number;
  };
  
  type PriceListType = {
    category: string,
    services: PriceType[]
  };

export default function PriceList(){

    const fetchPrice = async (): Promise<PriceListType[]> =>{
        const response = await fetch('/api/getPriceList');
        const data: PriceListType[] = await response.json();
        return data;
    };

    const {data, isError} = useQuery<PriceListType[]>({ 
        queryKey: ['priceList'], 
        queryFn: () => fetchPrice(),
    });

    {(isError) && <div>An error has occured.</div>}

    return(
        <div>
            <h1 className='text-center text-lg font-title uppercase mb-[4rem]'>Pricing List</h1>
            <div className={PricingStyle.outerCt}>
                {data?.map((category: PriceListType) => {
                    return(
                        <div key={category.category} className={PricingStyle.categoryCt}>
                            <h2 className={PricingStyle.categoryTitle}>{category.category}</h2>
                            {category.services.map(service => 
                                <div key={service.title} className={PricingStyle.priceList}>
                                    <div className={PricingStyle.listItem}>
                                        <span className='text-sm'>{service.title}</span>
                                        <span>{service.price} $</span>
                                    </div>
                                </div>
                            )}
                        </div> 
                    );
                })}
            </div> 
        </div>
    )
};