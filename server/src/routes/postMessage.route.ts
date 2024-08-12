import express from 'express';
import {postMessageInEmail} from '../controllers/postMessageInEmail.controller'

const router = express.Router();

router.post('/', postMessageInEmail);

export default router;