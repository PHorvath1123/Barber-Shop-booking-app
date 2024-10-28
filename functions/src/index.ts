import express, {Application} from "express";
import getBarbersRoute from "./routes/barbers.home.route";
import getPriceListRoute from "./routes/priceList.route";
import getWorkingTimeRoute from "./routes/workingTime.route";
import getBookingsRoute from "./routes/booking.route";
import postBookingRoute from "./routes/postBooking.route";
import {deleteOldBookings} from "./helpers/deleteOldBooking";
import path from "path";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";

import dotenv from "dotenv";
import {globalErrorHandler} from "./helpers/globalErrorHandler";

const app: Application = express();

const schedule = require("node-schedule");
dotenv.config();

app.use(express.json());

app.use("/api/getBarbersToHome", getBarbersRoute);
app.use("/api/getPriceList", getPriceListRoute);
app.use("/api/getAvailabilities", getWorkingTimeRoute);
app.use("/api/getBookings", getBookingsRoute);
app.use("/api/postBooking", postBookingRoute);

app.use(express.static(path.join(__dirname, "../../client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

// Global error handling middleware to catch the errors and send them via email for developing.
app.use(globalErrorHandler);

// Schedule a job to run every day at midnight (00:00) to delete the old bookings
// The job checks for all bookings where the appointment date is older than or equal to 5 days
schedule.scheduleJob("* 0 0 * * *", async () => {
  await deleteOldBookings();
});

export const api = onRequest((request, response) => {
  logger.info("API Request Received", {structuredData: true});
  app(request, response);
});

