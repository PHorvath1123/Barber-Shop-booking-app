import express from 'express';
import  {getBookingFromDB}  from '../controllers/booking.controller';

const router = express.Router();

router.get('/:barberId', getBookingFromDB);

export default router;