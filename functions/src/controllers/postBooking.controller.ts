import { db } from "../firebase.server.config";
import { NextFunction, Request, Response } from "express";
import { FieldValue } from "firebase-admin/firestore";
import xss from "xss";
import { bookingCounter } from "../helpers/bookingCounter";

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
  const bookingData: bookingDataType = {
    ...req.body,
    name: xss(req.body.name),
    email: xss(req.body.email),
    phone: xss(req.body.phone),
    comment: xss(req.body.comment),
  };

  const bookingIsUnderLimit: boolean = await bookingCounter();

  try {
    if (bookingIsUnderLimit) {
      const bookingWithDate = await db
        .collection("booking")
        .where("date", "==", bookingData.date)
        .where("appointment", "==", bookingData.appointment)
        .get();

      if (!bookingWithDate.empty) {
        throw new Error("This appointment is already booked.");
      }

      const bookingRef = db.collection("booking").doc();

      await db.runTransaction(async (transaction: any) => {
        transaction.set(bookingRef, {
          ...bookingData,
          timestamp: FieldValue.serverTimestamp(),
        });
        res.json({
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
