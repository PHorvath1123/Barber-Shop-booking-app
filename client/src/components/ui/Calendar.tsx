import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import updateLocale from "dayjs/plugin/updateLocale";
import {useGetWorkingTime} from "../../hook/useGetWorkingTime";


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
  color: "#D9D9D9"
};

export default function Calendar() {
  const [value, setValue] = useState<string>("")

  console.log(value);
  
  const highlightedDays = ["Monday", "Friday", "Wednesday"];

  const {data: days, error, isLoading, isError} = useGetWorkingTime(barberId);

  console.log(days);
  

  // set to Monday for the first day of the week
  dayjs.extend(updateLocale);
  dayjs.updateLocale("en", {
    weekStart: 1,
  });

  
 //Disables dates in the calendar that are not in the highlightedDays array.
  const shouldDisableDate = (date: Dayjs) => {
    const dayName = dayjs(date).format('dddd');
    return !highlightedDays.includes(dayName);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        disablePast
        dayOfWeekFormatter={(weekday) => `${weekday.format('dd')}`}
        onChange={
          (pickedDate) => {
            const date = new Date(pickedDate)
            const dd = String(date.getDate()).padStart(2, "0");
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const yyyy = date.getFullYear();
            setValue(`${yyyy}-${mm}-${dd}`);
          }}
        renderLoading={() => <DayCalendarSkeleton />}
        shouldDisableDate={shouldDisableDate}
        sx={{
          ".css-rhmlg1-MuiTypography-root-MuiDayCalendar-weekDayLabel": {
            color: "#D9D9D9",
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
        }}
      ></DateCalendar>
    </LocalizationProvider>
  );
}
