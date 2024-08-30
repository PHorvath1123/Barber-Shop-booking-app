import PricingStyle from '../styles/pricing/Pricing.module.css';
import {useQuery} from '@tanstack/react-query';
import Skeleton from '@mui/material/Skeleton';

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

    const {data, isError, isLoading} = useQuery<PriceListType[]>({ 
        queryKey: ['priceList'], 
        queryFn: () => fetchPrice()
    });

    {(isError) && <div>An error has occured.</div>}

    return(
        <div>
            <h1 className='text-center text-lg font-title uppercase mb-[4rem]'>Pricing List</h1>
            <div className={PricingStyle.outerCt}>
                {isLoading 
                && Array.from({length: 10}).map((__,i) => {
                    return(
                        <Skeleton 
                            sx={{
                                width: '40vw',
                                height: '30px',
                                backgroundColor: 'rgba(239, 105, 80, .05)'
                            }} 
                            key={i} 
                            animation="pulse">
                        </Skeleton>)})}
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