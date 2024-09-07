import { useFetchBarbersToHome } from "../hook/useFetchBarbersToHome";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import Rating from "@mui/material/Rating";
import Button from "../components/ui/Button";
import { useState } from "react";

type SelectorPropsType = {
  selectedOption: string,
  setSelectedOption: React.Dispatch<React.SetStateAction<string>>
}

export default function BarberSelector({selectedOption, setSelectedOption}:SelectorPropsType) {
  const [choosedBarber, setChoosedBarber] = useState<boolean>(false);

  const barbers = useFetchBarbersToHome();

  const renderCalendarAndSelectedBarber = (id: string) => {
    setChoosedBarber(true);
    setSelectedOption(id);
  };

  const renderBarberList = () => {
    return barbers.map(barber => {
      return (
        <div key={barber.id} className={AppointmentStyle.barberInnerCt}>
          <div className={AppointmentStyle.photoCt}>
            <img src={barber.photo} alt={`photo of the barber: ${barber.name}`} />
            <div className="flex flex-col items-center">
              <div className="text-action mb-[.5rem]">{barber.name}</div>
              <div>{barber.title}</div>
            </div>
          </div>
          <div className={AppointmentStyle.introductionCt}>
            <p className={AppointmentStyle.introduction}>
              {barber.introduction}
            </p>
            <div className={AppointmentStyle.ratingCt}>
              <span>Rating:</span>
              <Rating
                name="half-rating"
                defaultValue={barber.rating}
                precision={0.5}
                readOnly
                sx={{
                  color: "#EF6950",
                  ".MuiRating-icon": {
                    color: "#EF6950",
                  },
                  ".MuiRating-iconEmpty": {
                    color: "#D9D9D9",
                  },
                }}
              />
            </div>
            <Button
              onClick={() => renderCalendarAndSelectedBarber(barber.id)}
            >View Availability
            </Button>
          </div>
        </div>
      );
    });
  };

  const renderChoosedBarber = (id: string) => {
    
    const pickedBarber = barbers.filter(barber => {return barber.id === id})

    return pickedBarber.map(barber => {
      return(
        <div key={barber.id} className="flex flex-col items-center gap-3 mt-[1rem]">
          <img 
            src={barber.photo} 
            alt={`Photo of ${barber.name}`} 
            className={AppointmentStyle.choosedBarberImg} />
          <div className="flex flex-col items-center">
            <div className="text-action text-md">{barber.name}</div>
            <div className="text-xs">{barber.title}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <section>
      <h2 className={AppointmentStyle.title}>
        Choose a <span className="text-action font-title">barber</span>
      </h2>
      <div className="flex flex-col items-center justify-center gap-5">
        {!choosedBarber ? renderBarberList() : renderChoosedBarber(selectedOption)}
      </div>
    </section>
  );
}
