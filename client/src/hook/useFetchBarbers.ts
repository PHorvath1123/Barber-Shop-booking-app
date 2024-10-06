import { useEffect, useState } from "react";

type Barber = {
    name: string,
    title: string,
    photo: string,
    rating: number,
    introduction: string,
    id: string
};

export const useFetchBarbers = () => {
    
    const [barbers, setBarbers] = useState<Barber[]>([]);
    
    const getBarbers = async () => {
        try{
            const response = await fetch('/api/getBarbersToHome');
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setBarbers(data);  
        }
        catch(err){
            console.error('Failed to fetch barbers:', err);
        }
     };

    useEffect(() =>{
        getBarbers();
    }, []);

    return barbers;
};

