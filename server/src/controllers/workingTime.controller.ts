import { db } from '../firebase.server.config';
import { NextFunction, Request, Response } from 'express';

type appointmentsType = {
    day: string,
    open: string, 
    close: string
};

export const getWorkingTimeFromDB = async(req: Request, res: Response, next: NextFunction) => {

    try{
        const { barberId, selectedDay } = req.params;

        // If no specific day is provided, return availability for all days
        if(!selectedDay){
            const workingTimeRef = db.collection('barbers').doc(barberId).collection('availability');
            const workingTimeSnapshot = await workingTimeRef.get();

            if(workingTimeSnapshot.empty){
                throw new Error("No availability found")
            }

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
            
            if (appointmentSnapshot.empty){
                throw new Error("No availability found on specified day")
            }

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
        res.status(500).json({message:`Error getting working time. ${error}`});
        next(error);
    }
};