import express from 'express';
import { getPriceListFromDB } from '../controllers/priceList.controller';

const router = express.Router();

router.get('/', getPriceListFromDB);

export default router;