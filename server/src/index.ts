import express, { Application, NextFunction, Request, Response } from "express";
import getBarbersRoute from "./routes/barbers.home.route";
import getPriceListRoute from "./routes/priceList.route";
import getWorkingTimeRoute from "./routes/workingTime.route";
import getBookingsRoute from "./routes/booking.route";
import postBookingRoute from "./routes/postBooking.route";
import { deleteOldBookings } from "./deleteOldBooking";
import { setTimeout } from "timers";
import dotenv from "dotenv";

const app: Application = express();

const schedule = require("node-schedule");
const fetch = require("node-fetch");
dotenv.config();
const port = 3000;

app.use(express.json());

app.use("/api/getBarbersToHome", getBarbersRoute);
app.use("/api/getPriceList", getPriceListRoute);
app.use("/api/getAvailabilities", getWorkingTimeRoute);
app.use("/api/getBookings", getBookingsRoute);
app.use("/api/postBooking", postBookingRoute);

let errorEmailSent = false;

// Global error handling middleware to catch the errors and send them via email for developing.
app.use(
  async (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (errorEmailSent == false) {
      const object = {
        error: error.message,
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: "An error has occurred in Prestige Cuts website",
      };

      const json = JSON.stringify(object);

      // Try to send an email with error message
      try {
        const request = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        });

        const response = await request.json();

        if (!response.ok) {
          throw new Error(
            `Failed to send error message: ${response.statusText}`
          );
        } else {
          errorEmailSent = true;

          setTimeout(() => {
            errorEmailSent = false;
          }, 60 * 1000);
        }
      } catch (err) {
        res.status(500).send(err);
      }
    } else next();
  }
);

// Schedule a job to run every day at midnight (00:00) to delete the old bookings
// The job checks for all bookings where the appointment date is older than or equal to 5 days
schedule.scheduleJob("* 0 0 * * *", async () => {
  await deleteOldBookings();
});

app.listen(port);
