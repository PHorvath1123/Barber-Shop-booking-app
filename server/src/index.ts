import express, { Request, Response , Application } from 'express';
import path from 'path';
import getBarbersRoute from './routes/barbers.home.route';


const app: Application = express();

const port = 5001;

app.get('/', (req: Request, res: Response) => {
    res.send("Hello!")
});

app.use('/getBarbersToHome', getBarbersRoute);


app.listen(port);