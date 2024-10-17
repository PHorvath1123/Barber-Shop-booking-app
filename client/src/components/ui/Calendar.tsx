import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { useGetWorkingTime } from "../../hook/useGetWorkingTime";
import {colorPalette as color} from '../../utils/colorPalette'
import {useGetBookedAppointments} from '../../hook/useGetBookedAppointments'
import type {selectedDateType} from '../../pages/Booking'
import { isDayAvailable } from "../../utils/checkAvailability.utils";
import type {selectedBarberType} from '../../pages/Booking'
import AppointmentStyle from '../../styles/appointment/Appointment.module.css'

type CalendarProps = {
  selectedBarber: selectedBarberType | null,
  setSelectedDay: React.Dispatch<React.SetStateAction<selectedDateType | null>>
};

const pickersDayStyle = {
  sx: {
    color: color.green,
    fontSize: "17px",
    "&:focus": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-selected.MuiPickersDay-root": {
      backgroundColor: color.action,
    },
    "&.MuiPickersDay-root:not(.Mui-selected)": {
      borderColor: color.action,
    },
    "&.Mui-disabled.MuiPickersDay-root": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
};

const commonColor = {
  color: color.light,
};

export default function Calendar({ selectedBarber, setSelectedDay }: CalendarProps) {

  // Fetch the working time from the database
  const {
    data: availability,
    isLoading,
    isError,
    error,
  } = useGetWorkingTime(selectedBarber?.id);

  // Fetch the booked appointments
  const {data: booking} = useGetBookedAppointments(selectedBarber?.id);

  // set to Monday for the first day of the week
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  /**
   * Disables dates in the calendar that are not in the workingDays array or do not have any free appointments.
   * @param {Dayjs} date - the date in the calendar
   * @return {boolean}
   */
  const shouldDisableDate = (date: Dayjs) => {

    const workingDays: string[] = [];
    availability?.map((days) => {
      if (days.day){
        workingDays.push(days.day); // day key is optional
      }
    });

    const dayName = dayjs(date).format("dddd");
    const isWorkingDay = workingDays.includes(dayName);

    if(!isWorkingDay){
      return true;
    }

    if (!booking || booking.length === 0) {
      return false;
    }

    // Check if the booked date matches the current date being checked and if the booked day is unavailable
    const isDayBooked = booking?.some(bookedDay =>{
      const bookedDate = dayjs(bookedDay.date).format("YYYY-MM-DD");
      const calendarDate = dayjs(date).format("YYYY-MM-DD");
      return bookedDate === calendarDate && (!isDayAvailable(bookedDay.date, bookedDay.dayName, availability, booking))
    });

    return isDayBooked
  }
  
  return (
    <>
      {isError ? (
        <span className={AppointmentStyle.errorMessage}>{error.message}</span>
      ) : (
        <article>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              disablePast
              loading={isLoading}
              dayOfWeekFormatter={(weekday) => `${weekday.format("dd")}`}
              onChange={(pickedDate) => {
                const date = new Date(pickedDate);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const year = date.getFullYear();
                const dayFormat = `${year}-${month}-${day}`
                const dayOfTheWeek = dayjs(pickedDate).format("dddd");
                setSelectedDay({date:dayFormat, dayName:dayOfTheWeek}); 
              }}
              renderLoading={() => <DayCalendarSkeleton />}
              shouldDisableDate={shouldDisableDate}
              sx={{
                ".css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel": {
                  color: color.light,
                },
                "&.MuiDateCalendar-root":{
                  border: `1px solid ${color.light}`,
                  borderRadius: '25px',
                },
              }}
              slotProps={{
                day: pickersDayStyle,
                calendarHeader: {
                  sx: commonColor,
                },
                leftArrowIcon: {
                  sx: commonColor,
                },
                rightArrowIcon: {
                  sx: commonColor,
                },
                switchViewButton: {
                  sx: commonColor,
                },
                yearButton:{
                  sx:{
                    '&.MuiPickersYear-yearButton.Mui-selected':{
                      backgroundColor: color.action
                    }
                  }
                }
              }}
            ></DateCalendar>
          </LocalizationProvider>
        </article>
      )}
    </>
  );
}
