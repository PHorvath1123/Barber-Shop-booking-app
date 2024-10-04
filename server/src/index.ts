import express, { Application } from 'express';
import getBarbersRoute from './routes/barbers.home.route';
import getPriceListRoute from './routes/priceList.route';
import getWorkingTimeRoute from './routes/workingTime.route'
import getBookingsRoute from './routes/booking.route'
import postBookingRoute from './routes/postBooking.route'

const app: Application = express();

const port = 3000;

app.use(express.json());

app.use('/api/getBarbersToHome', getBarbersRoute);
app.use('/api/getPriceList', getPriceListRoute);
app.use('/api/getAvailabilities', getWorkingTimeRoute);
app.use('/api/getBookings', getBookingsRoute);
app.use('/api/postBooking', postBookingRoute);

app.listen(port);