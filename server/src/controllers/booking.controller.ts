import { log } from 'console';
import { db } from '../firebase.server.config';
import { Request, Response } from 'express';

type bookingsType = {
    date: string,
    appointment: string,
    dayName: string
};

export const getBookingFromDB = async(req: Request, res: Response) =>{
    

    try{
        const barberId = req.params.barberId;
        const bookingRef = db.collection("booking");
        const barberBooking = await bookingRef.where('barberId', '==', barberId).get();
        
        if (barberBooking.empty) {
            res.status(404).send('No matching documents.');
            return;
        }
        else{
            const bookings: bookingsType[] = [];
            barberBooking.forEach((doc:any) => {
                const data = doc.data();
                const booking = {
                    date: data.date,
                    appointment: data.appointment,
                    dayName: data.dayName
                };
                bookings.push(booking);
            });
            res.json(bookings);
        }  
    }
    catch(error){
        console.error('Error getting working time:', error);
        res.status(500).send('Internal Server Error');
    }
};