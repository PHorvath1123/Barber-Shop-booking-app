import { daysType } from "../hook/useGetWorkingTime";
import { generateTimeSlots } from "./generateTimeSlots";
import { bookingType } from "../hook/useGetBookedAppointments";

/**
 * Retrieves available time slots for a specific date and day of the week.
 *
 * @param date 
 * @param dayName 
 * @returns {Array} - Returns an array of available time slots for the given date and day.
 */
export const getAvailableSlots = (date:string | undefined, dayName:string | undefined, availability: daysType[] | undefined, booking: bookingType[]) => {

    //Find the specified day of the availability array
    const workTimeOnBookedDay: daysType | undefined = availability?.find(workingDay => workingDay.day === dayName);

    /**
     * Generate all possible time slots on the booked day.
     * @type {Array}
    */
    const allPossibleSlotsOnBookedDay = generateTimeSlots(workTimeOnBookedDay)
    const allBookingsOnBookedDay = booking?.filter(book => book.date === date);

    /**
     * Retrieves all available slots on the booked day.
     * @type {Array}
    */
    return allPossibleSlotsOnBookedDay.filter(slot => {
        return !allBookingsOnBookedDay?.some(book => book.appointment === slot)
    })
};

/**
 * If any slots are available on the booked day, return false
 * @param date - The specific date for which to check available slots (e.g., '2024-09-23').
 * @param dayName - The name of the day of the week (e.g., 'Monday').
 * @param availability - Every working day of the barber with working time (e.g., [{day: "Monday", open: "11:00", close: "16:00"}, {}])
 * @param booking - Every booked appointment of the barber (e.g., [{date: "2024-09-23", appointment: "11:30", dayName: 'Monday'}, {}])
 * @return {boolean}
 */
export const isDayAvailable = (date:string, dayName:string, availability: daysType[] | undefined, booking: bookingType[]) =>{
    const availableSlotsForDay: string[] = getAvailableSlots(date, dayName, availability, booking); 
    return availableSlotsForDay.length > 0;
};