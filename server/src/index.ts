import express, { Application } from 'express';
import getBarbersRoute from './routes/barbers.home.route';
import getPriceListRoute from './routes/priceList.route';
import getWorkingTimeRoute from './routes/workingTime.route'
import getBookingsRoute from './routes/booking.route'
import postBookingRoute from './routes/postBooking.route'
import {deleteOldBookings} from './deleteOldBooking'

const app: Application = express();

const schedule = require('node-schedule');

const port = 3000;

app.use(express.json());

app.use('/api/getBarbersToHome', getBarbersRoute);
app.use('/api/getPriceList', getPriceListRoute);
app.use('/api/getAvailabilities', getWorkingTimeRoute);
app.use('/api/getBookings', getBookingsRoute);
app.use('/api/postBooking', postBookingRoute);


// Schedule a job to run every day at midnight (00:00) to delete the old bookings
// The job checks for all bookings where the appointment date is older than or equal to 5 days
schedule.scheduleJob('* 0 0 * * *', async() => {
    await deleteOldBookings();
 });

app.listen(port);