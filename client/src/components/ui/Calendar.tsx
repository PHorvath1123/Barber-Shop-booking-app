import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { useGetWorkingTime } from "../../hook/useGetWorkingTime";
import AppointmentStyle from "../../styles/appointment/Appointment.module.css";

type CalendarProps = {
  selectedBarberId: string,
  setSelectedDay: React.Dispatch<React.SetStateAction<string>>
};

const pickersDayStyle = {
  sx: {
    color: "#D9D9D9",
    "&:focus": {
      backgroundColor: "transparent",
    },
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-selected.MuiPickersDay-root": {
      backgroundColor: "#EF6950",
    },
    "&.MuiPickersDay-root:not(.Mui-selected)": {
      borderColor: "#EF6950",
    },
    "&.Mui-disabled.MuiPickersDay-root": {
      color: "rgba(255, 255, 255, 0.5)",
    },
  },
};

const commonColor = {
  color: "#D9D9D9",
};

export default function Calendar({ selectedBarberId, setSelectedDay }: CalendarProps) {

  // Fetch the working time from the database
  const {
    data: availability,
    isLoading,
    isError,
    error,
  } = useGetWorkingTime(selectedBarberId);

  const workingDays: string[] = [];
  availability?.map((days) => {
    workingDays.push(days.day);
  });

  // set to Monday for the first day of the week
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  //Disables dates in the calendar that are not in the workingDays array.
  const shouldDisableDate = (date: Dayjs) => {
    const dayName = dayjs(date).format("dddd");
    return !workingDays.includes(dayName);
  };
  
  return (
    <>
      {isError ? (
        <span>An error has occured: {error.message}</span>
      ) : (
        <>
          <h2 className={AppointmentStyle.title}>
            Choose a <span className="text-action font-title">day</span>
          </h2>
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
                setSelectedDay(`${year}-${month}-${day}`)
              }}
              renderLoading={() => <DayCalendarSkeleton />}
              shouldDisableDate={shouldDisableDate}
              sx={{
                ".css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel": {
                  color: "#D9D9D9",
                },
                "&.MuiDateCalendar-root":{
                  border: '1px solid #D9D9D9',
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
                      backgroundColor: "#EF6950"
                    }
                  }
                }
              }}
            ></DateCalendar>
          </LocalizationProvider>
        </>
      )}
    </>
  );
}
