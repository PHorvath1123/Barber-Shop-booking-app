import express, { Request, Response , Application } from 'express';
import path from 'path';
import getBarbersRoute from './routes/barbers.home.route';

const app: Application = express();

const port = 5001;

app.use(express.json());

app.use('/api/getBarbersToHome', getBarbersRoute);

app.listen(port);