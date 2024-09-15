import {appointmentType} from '../hook/useGetAppointments'

export const generateTimeSlots = (availableDays?: appointmentType) =>{

    const timeSlots: string[] = [];
    
    let [openHour, openMinute]= availableDays?.open.split(':').map(Number) || [];
    let [closeHour, closeMinute] = availableDays?.close.split(':').map(Number) || [];


    const openTime = new Date();
    openTime.setHours(openHour, openMinute, 0, 0);
    
    const closeTime = new Date();
    closeTime.setHours(closeHour, closeMinute, 0, 0);

    while (openTime <= closeTime) {
        let hours = openTime.getHours().toString().padStart(2, '0');
        let minutes = openTime.getMinutes().toString().padStart(2, '0');
        timeSlots.push(`${hours}:${minutes}`);

        openTime.setMinutes(openTime.getMinutes() + 30);
    }
    return timeSlots;
};