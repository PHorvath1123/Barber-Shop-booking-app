import { db } from '../firebase.server.config';
import { Request, Response } from 'express';

type workingTimeType = {
    day: string,
    open: string, 
    close: string
};

export const getWorkingTimeFromDB = async(req: Request, res: Response) => {

    try{
        const { barberId } = req.params;
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
    catch(error){
        console.error('Error getting working time:', error);
        res.status(500).send('Internal Server Error');
    }
};