import express from 'express';
import { getBarbersFromDB } from '../controllers/barbers.home.controller';

const router = express.Router();

router.get('/', getBarbersFromDB);

export default router;