import express from 'express';
import  {addBookingToDB}  from '../controllers/postBooking.controller';

const router = express.Router();

router.post('/', addBookingToDB);

export default router;