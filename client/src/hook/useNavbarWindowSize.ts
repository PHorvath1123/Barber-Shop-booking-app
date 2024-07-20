import {useState, useEffect} from 'react';

export default function useNavbarWindowsize(){

    const [isMobile, setIsMobile] = useState<boolean>(true);

    useEffect(() => {
       const handleResize = () => {
            window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true);
       };
       
        window.addEventListener('resize', handleResize);
       
        return () => { 
            window.removeEventListener('resize', handleResize) 
        };     
    }, []);

    return isMobile;
};