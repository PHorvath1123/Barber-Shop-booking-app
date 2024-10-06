import { db } from './firebase.server.config';
import { FieldValue } from 'firebase-admin/firestore';

// Function to count and limit the number of bookings per day
export const bookingCounter = async() => {

    const today = new Date();
    const formattedDay = today.toISOString().split('T')[0];
    
    const dayStatisticRef = db.collection('bookingCounter').doc('bookingCount');
    const dayStatisticDoc = await dayStatisticRef.get();

    const {count, date} = dayStatisticDoc.data();

    if(date === formattedDay){
        if(count <= 50){
            // Increment the booking count and update the document
            await dayStatisticRef.update({count: FieldValue.increment(1)});
            return true;
        }else 
            return false;
    }else{
        // If it's a new day, reset the count to 1 and update the date to today
        await dayStatisticRef.update({count: 1, date: formattedDay});
        return true;
    }
};