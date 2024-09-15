import { db } from '../firebase.server.config';
import { Request, Response } from 'express';

type appointmentsType = {
    open: string, 
    close: string
};

type workingTimeType = appointmentsType & {
    day: string 
};

export const getWorkingTimeFromDB = async(req: Request, res: Response) => {

    try{
        const { barberId, selectedDay } = req.params;

        // If no specific day is provided, return availability for all days
        if(!selectedDay){
            const workingTimeRef = db.collection('barbers').doc(barberId).collection('availability');
            const workingTimeSnapshot = await workingTimeRef.get();
            const workingTime: workingTimeType[] = [];
    
            workingTimeSnapshot.forEach((doc: any) => {
                const data = doc.data();
                const days = {
                    day: doc.id,
                    open: data.open,
                    close: data.close
                }
                workingTime.push(days);
            });
    
            res.json(workingTime);
        }
         // If a specific day is provided, return availability for that day
        else{
            const appointmentRef = db.collection('barbers').doc(barberId).collection('availability').doc(selectedDay);
            const appointmentSnapshot = await appointmentRef.get();
            const data = appointmentSnapshot.data();
            const appointment: appointmentsType = {
                open: data.open,
                close: data.close
            };
            res.json(appointment)
        }
    }
    catch(error){
        console.error('Error getting working time:', error);
        res.status(500).send('Internal Server Error');
    }
};