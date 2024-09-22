import { db } from '../firebase.server.config';
import { Request, Response } from 'express';

type appointmentsType = {
    day: string,
    open: string, 
    close: string
};

export const getWorkingTimeFromDB = async(req: Request, res: Response) => {

    try{
        const { barberId, selectedDay } = req.params;

        // If no specific day is provided, return availability for all days
        if(!selectedDay){
            const workingTimeRef = db.collection('barbers').doc(barberId).collection('availability');
            const workingTimeSnapshot = await workingTimeRef.get();
            const workingTime: appointmentsType[] = [];
    
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
            const freeAppointments: appointmentsType[] = [];
            const appointment: appointmentsType = {
                day: appointmentRef.id,
                open: data.open,
                close: data.close
            };
            freeAppointments.push(appointment)
            res.json(freeAppointments)
        }
    }
    catch(error){
        console.error('Error getting working time:', error);
        res.status(500).send('Internal Server Error');
    }
};