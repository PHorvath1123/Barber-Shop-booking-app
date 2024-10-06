import { db} from '../firebase.server.config';
import { Request, Response } from 'express';
import { FieldValue } from 'firebase-admin/firestore';
import xss from 'xss';


type bookingDataType = {
    barberId?: string,
    date?: string,
    dayName?: string,
    appointment: string,
    serviceTitle?: string,
    servicePrice?: number,
    name?: string,
    email?: string,
    phone?: string,
    comment?: string | null
}

export const addBookingToDB = async(req: Request, res: Response) => {
    
    const bookingData: bookingDataType = {
        ...req.body,
        name: xss(req.body.name),
        email: xss(req.body.email),
        comment: xss(req.body.comment)
    };

    try{
        const newBooking = await db.collection('booking').add({
            ...bookingData,
            timestamp: FieldValue.serverTimestamp()
        });

        res.status(201).json({
            dayName: bookingData.dayName,
            date: bookingData.date,
            appointment: bookingData.appointment
        });

    }catch(err){
        res.status(500).json({error: `Booking failed: ${err}`});
    }
};