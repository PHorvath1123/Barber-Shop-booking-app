import {db} from "../firebase.server.config";
import {NextFunction, Request, Response} from "express";

type bookingsType = {
    date: string,
    appointment: string,
    dayName: string
};

export const getBookingFromDB = async (req: Request, res: Response, next: NextFunction) =>{
  try {
    const barberId = req.params.barberId;
    const bookingRef = db.collection("booking");
    const barberBooking = await bookingRef.where("barberId", "==", barberId).get();

    if (barberBooking.empty) {
      throw new Error("Booking not found.");
    }

    const bookings: bookingsType[] = [];
    barberBooking.forEach((doc:any) => {
      const data = doc.data();
      const booking = {
        date: data.date,
        appointment: data.appointment,
        dayName: data.dayName,
      };
      bookings.push(booking);
    });
    res.json(bookings);
  } catch (error) {
    console.error("Error getting bookings:", error);
    res.status(500).json({message: `Error getting bookings. ${error}`});
    next(error);
  }
};
