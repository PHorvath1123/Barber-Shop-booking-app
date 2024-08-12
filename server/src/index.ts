import express, { Application } from 'express';
import path from 'path';
import getBarbersRoute from './routes/barbers.home.route';
import postMessageRoute from './routes/postMessage.route';


const app: Application = express();

const port = 3000;

app.use(express.json());

app.use('/api/getBarbersToHome', getBarbersRoute);

app.use('/api/postMessage', postMessageRoute);

app.listen(port);