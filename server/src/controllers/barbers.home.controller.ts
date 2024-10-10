import { db } from '../firebase.server.config';
import { NextFunction, Request, Response } from 'express';

type BarberResponse = {
  name: string,
  title: string,
  photo: string,
  rating: number,
  introduction: string,
  id: string
};

export const getBarbersFromDB = async (req: Request, res: Response, next: NextFunction) => {

  try{
    const barbersRef = db.collection('barbers');
    const barbersSnapshot = await barbersRef.get();

    if (barbersSnapshot.empty){
      throw new Error("No barbers found in database");
    }
    
    const barbers: BarberResponse[] = [];

    barbersSnapshot.forEach((doc: any) => {

      const data = doc.data();
      const barber = {
        ...data,
        id: doc.id,
      }
      barbers.push(barber);
    });

    res.json(barbers);
    
  }
  catch(error){
    console.error('Error getting barbers:', error);
    res.status(500).json({message: `Error getting barbers: ${error}`});
    next(error);
  };
};