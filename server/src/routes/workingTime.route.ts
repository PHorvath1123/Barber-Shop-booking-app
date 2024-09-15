import express from 'express';
import  {getWorkingTimeFromDB}  from '../controllers/workingTime.controller';

const router = express.Router();

router.get('/:barberId/:selectedDay?', getWorkingTimeFromDB);

export default router;