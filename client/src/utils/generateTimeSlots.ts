import {daysType} from '../hook/useGetWorkingTime'

export const generateTimeSlots = (availableDays?: daysType) =>{

    const timeSlots: string[] = [];
    
    // Destructure the "openHour" and "openMinute" values
    let [openHour, openMinute]= availableDays?.open.split(':').map(Number) || [];
    let [closeHour, closeMinute] = availableDays?.close.split(':').map(Number) || [];


    const openTime = new Date();
    openTime.setHours(openHour, openMinute, 0, 0);
    
    const closeTime = new Date();
    closeTime.setHours(closeHour, closeMinute, 0, 0);

    // Generate time slots from "openTime" to "closeTime" in 30-minute intervals
    while (openTime <= closeTime) {
        let hours = openTime.getHours().toString().padStart(2, '0');
        let minutes = openTime.getMinutes().toString().padStart(2, '0');
        timeSlots.push(`${hours}:${minutes}`);

        openTime.setMinutes(openTime.getMinutes() + 30);
    }
    return timeSlots;
};