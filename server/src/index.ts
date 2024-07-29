import express, { Request, Response , Application } from 'express';
import path from 'path';

const app: Application = express();


const port = 5000;

app.get('/', (req: Request, res: Response) => {
    res.send("hello woooorld");
});

app.listen(port);