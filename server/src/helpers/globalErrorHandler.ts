import { setTimeout } from "timers";
import { NextFunction, Request, Response } from "express";

const fetch = require("node-fetch");

let errorEmailSent = false;
let lastErrorMessage = "";

export const globalErrorHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!errorEmailSent && lastErrorMessage !== error.message) {
    lastErrorMessage = error.message;

    const object = {
      error: error.message,
      access_key: process.env.WEB3FORMS_ACCESS_KEY,
      subject: "An error has occurred in Prestige Cuts website",
    };

    const json = JSON.stringify(object);

    // Try to send an email with error message
    try {
      const request = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      if (!request.ok) {
        throw new Error("Failed to send error message");
      }

      errorEmailSent = true;

      setTimeout(() => {
        errorEmailSent = false;
      }, 20 * 1000);

    } catch (err) {
      console.error(err);
    }
    
  } else next();
};
