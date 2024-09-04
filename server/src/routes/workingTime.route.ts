import express from 'express';
import  {getWorkingTimeFromDB}  from '../controllers/workingTime.controller';

const router = express.Router();

router.get('/:barberId', getWorkingTimeFromDB);

export default router;