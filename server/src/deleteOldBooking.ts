import { db } from './firebase.server.config';

export const deleteOldBookings = async() => {
    try{
        const today = new Date();
        const cutOffDate = new Date(today.setDate(today.getDate()-5))

        const bookingRef = db.collection("booking");
        
        // Query to find bookings with a 'date' less than or equal to the cutoff date (ISO date format)
        const oldBookings = await bookingRef.where('date', '<=', cutOffDate.toISOString().split('T')[0]).get()

        if(!oldBookings.empty){
            const batch = db.batch();
            oldBookings.forEach((oldBooking : any) => batch.delete(oldBooking.ref))
            batch.commit();
            
        } else return
        
    }catch(error){
        console.error(`Failed to delete booking: ${error}`)
    }
};
