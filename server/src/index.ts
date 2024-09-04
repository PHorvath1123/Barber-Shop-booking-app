import express, { Application } from 'express';
import path from 'path';
import getBarbersRoute from './routes/barbers.home.route';
import getPriceListRoute from './routes/priceList.route';
import getWorkingTimeRoute from './routes/workingTime.route'


const app: Application = express();

const port = 3000;

app.use(express.json());

app.use('/api/getBarbersToHome', getBarbersRoute);
app.use('/api/getPriceList', getPriceListRoute);
app.use('/api/getAvailabilities', getWorkingTimeRoute);

app.listen(port);