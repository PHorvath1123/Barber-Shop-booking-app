import express from "express";
import {addBookingToDB} from "../controllers/postBooking.controller";
import {body} from 'express-validator'

const router = express.Router();

const bookingValidator = [
    body('barberId').isString().notEmpty().escape(),
    body('date').isString().notEmpty().escape(),
    body('dayName').isString().escape(),
    body('appointment').isString().notEmpty().escape(),
    body('serviceTitle').isString().notEmpty().escape(),
    body('servicePrice').isNumeric().notEmpty().escape(),
    body('name').isString().notEmpty().escape().matches(/^([\wöüóőúéáűí]{3,})+\s+([\wöüóőúéáűí\s]{3,})+$/gim),
    body('email').isEmail().notEmpty().escape(),
    body('phone').isNumeric().notEmpty().escape(),
    body('comment').escape(),
]

router.post("/", bookingValidator, addBookingToDB);

export default router;
