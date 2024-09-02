import { db } from '../firebase.server.config';
import { Request, Response } from 'express';

type BarberResponse = {
  name: string,
  title: string,
  photo: string,
  rating: number,
  introduction: string
};

export const getBarbersFromDB = async (req: Request, res: Response) => {

  try{
    const barbersRef = db.collection('barbers');
    const barbersSnapshot = await barbersRef.get();
    
    const barbers: BarberResponse[] = [];

    barbersSnapshot.forEach((doc: any) => {

      const data = doc.data();
      barbers.push(data);
    });

    res.json(barbers);
    
  }
  catch(error){
    console.error('Error getting barbers:', error);
    res.status(500).send('Internal Server Error');
  };
};