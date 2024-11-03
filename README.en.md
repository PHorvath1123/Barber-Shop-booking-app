# Prestige Cuts barber shop booking app

## Project Overview

**Description**: This is an appointment booking application that I created for a barber shop. The application allows customers to book appointments online and send messages to the barber shop. Visitors can individually select when, with whom, and which service they want to use. The project also includes a global error handler on the backend side, which automatically sends an email to the developer in case of server-side errors. Additionally, there is a daily booking limit that counts the bookings, as well as a function that automatically deletes bookings 5 days after the booked date. The input data is protected against XSS attacks.

## Goal

The goal of the project is to create an online appointment booking system that makes booking easier for the barber shop's customers and simplifies communication between the shop and its customers. The project also enhances the customer experience through a modern, easy-to-use online interface and ensures efficient error management and secure data processing.

## Main Features

- **Appointment Booking**: User-friendly calendar through which customers can easily book an appointment.
- **Service Selection**: Customers can choose from various services, such as haircut, beard grooming, etc.
- **Data Management**: Users' names, email addresses, phone numbers, and booking data are stored.
- **Contact**: Visitors can send a message to the barber shop via the contact form on the website.
- **Global Error Management**: In case of server-side errors, the system automatically sends an email to the developer.
- **Daily Booking Limit**: Counts the bookings to track daily activity.
- **Automatic Deletion**: Bookings are automatically deleted 5 days after the booked date.
- **XSS Protection**: Booking data is protected against XSS attacks.

## Technologies

- **Google-Recaptcha**: To protect against spam and automated requests.
- **ZOD**: For user input validation.
- **React Query**: For data management and caching.
- **React Router V6**: For navigation within the application.
- **VITE**: For fast build and development of the application.
- **nodemon**: For automatic server restarts during development.
- **nodemailer**: For sending emails from the application.
- **node-schedule**: For scheduling and executing timed tasks.

- **React**: For building the application's user interface.
- **Typescript**: For type safety and better maintainability.
- **TailwindCSS, SCSS, Material UI**: To simplify styling and quick design.
- **Node.js and Express**: For backend communication.
- **Firebase**: Firestore for database management, Storage for file storage, App Check for security, Cloud Functions for backend functions, and hosting for the demo.

## Usage

In the application, users can book an appointment, provide the required information (name, email, phone number), and receive a confirmation after submitting. Additionally, visitors can contact the barber shop via the contact form on the website.

## Planned Developments

- **Authentication and Admin Interface**: Development of an admin interface with authentication for secure application management.
- **Webshop Integration**: Introduction of a webshop module within the application to offer additional products and services.

## Contribution

If you are interested in further developing the project or fixing issues, I welcome pull requests or opening issues.

## Demo

The demo version of the application is available at the following link: [Barber Shop Booking App Demo](https://barber-shop-fc206.web.app)

