import { db } from "../firebase.server.config";
import { NextFunction, Request, Response } from "express";
import { FieldValue } from "firebase-admin/firestore";
import { bookingCounter } from "../helpers/bookingCounter";
import { validationResult } from "express-validator";

type bookingDataType = {
  barberId?: string;
  date?: string;
  dayName?: string;
  appointment: string;
  serviceTitle?: string;
  servicePrice?: number;
  name?: string;
  email?: string;
  phone?: string;
  comment?: string | null;
};

export const addBookingToDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    // Validate incoming request data
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      throw new Error("Invalid input data.");
    }

    const bookingData: bookingDataType = req.body;

    // Check if the number of bookings is within the daily limit
    const bookingIsUnderLimit: boolean = await bookingCounter();

    if (bookingIsUnderLimit) {
      // Query the database to check for existing bookings with the same date and appointment time
      const existingBooking = await db
        .collection("booking")
        .where("date", "==", bookingData.date)
        .where("appointment", "==", bookingData.appointment)
        .get();

      if (!existingBooking.empty) {
        throw new Error("This appointment is already booked.");
      }

      const bookingRef = db.collection("booking").doc();
      
      // Use a transaction to safely create the new booking
      await db.runTransaction(async (transaction: any) => {
        await transaction.set(bookingRef, {
          ...bookingData,
          timestamp: FieldValue.serverTimestamp(),
        });
        res.status(200).json({
          dayName: bookingData.dayName,
          date: bookingData.date,
          appointment: bookingData.appointment,
        });
      });
    } else {
      res
        .status(429)
        .json({ message: "Daily booking limit reached. Try again later." });
    }
  } catch (error) {
    res.status(500).json({ message: `Booking failed. ${error}` });
    next(error);
  }
};
