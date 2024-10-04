import { useQueryClient, useMutation } from '@tanstack/react-query';
import {bookingDataType} from '../components/BookingConfirmation'

const postBookingData = async (bookingData?: bookingDataType) => {
    const request = await fetch('/api/postBooking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(bookingData)
    });
    const responseText = request.text();
    return responseText;
};

export const usePostBooking = (bookingData?: bookingDataType) => {
    
    console.log(bookingData);
    
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: () => postBookingData(bookingData),
        onSuccess: () => {
            window.alert('Booking is successfully!');
        }
    })
};