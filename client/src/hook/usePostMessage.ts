import {useState} from 'react'
import type {formData} from '../components/Contact'

export const usePostMessage = () =>{

    const [isSuccessful, setIsSuccessful] = useState<boolean>(false);

    const sendMessage = async({name, email, message}: formData) =>{

        try{
            const response = await fetch('/api/postMessage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({name, message, email})
            });

            if(response.ok){
                setIsSuccessful(true);
            }
           
        }catch(error){
            console.error(`Error message: ${error}`);
        };
    };

    return {isSuccessful, sendMessage};       
};