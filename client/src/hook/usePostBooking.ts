import { useMutation } from "@tanstack/react-query";
import { bookingDataType } from "../components/BookingConfirmation";

export type BookingResponseType = {
  dayName: string;
  date: string;
  appointment: string;
};

const postBookingData = async (bookingData?: bookingDataType) => {
  const request = await fetch("/api/postBooking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookingData),
  });

  if (!request.ok) {
    const errorData = await request.json();

    throw {
      message: errorData.message,
    };
  }

  const response: BookingResponseType = await request.json();
  return response;
};

export const usePostBooking = (bookingData?: bookingDataType) => {
  return useMutation({
    mutationFn: () => postBookingData(bookingData),
  });
};
