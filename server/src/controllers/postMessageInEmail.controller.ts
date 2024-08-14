import { Request, Response } from 'express';
const nodemailer = require('nodemailer');
const mailgunTransport = require('nodemailer-mailgun-transport')
import dotenv  from "dotenv";
dotenv.config();

export const postMessageInEmail = (req: Request, res: Response) =>{
    
  
    const request = req.body;

    const auth = {
        auth: {
        domain: process.env.EMAIL_MAILGUN,
        api_key: process.env.EMAIL_API_KEY
      }};
    
    const transporter = nodemailer.createTransport(mailgunTransport(auth));

    const message = {
        from: 'prestigecuts96@gmail.com',
        to: 'prestigecuts96@gmail.com',
        subject: `Message from ${request.name}`,
        text: `${request.message}`,
    };


    const sendMessage = async() => {
        try{
            await transporter.sendMail(message);
            console.log('message sent');
            
        }
        catch (error) {
            console.error(error);
        }
    };

    sendMessage();
    res.status(200).send('successful sending');
};