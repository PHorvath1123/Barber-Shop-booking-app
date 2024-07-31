import { useEffect, useState } from "react";

type Barber = {
    photo: string,
    name: string,
    title: string
};

export const useFetchBarbersToHome = () => {
    
    const [barbers, setBarbers] = useState<[]>([]);
    
    const getBarbers = async () => {
        try{
            const request = await fetch('/getBarbersToHome');
            const data = await request.json();
            setBarbers(data);
        }
        catch(err: any){
            console.error(err);
        }
     };

    useEffect(() =>{
        getBarbers();
    }, []);

    return barbers;
};

