import { useFetchBarbers } from "../hook/useFetchBarbers";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import Rating from "@mui/material/Rating";
import Button from "../components/ui/Button";
import {selectedBarberType} from '../pages/Booking'

type SelectorPropsType = {
  selectedOption: selectedBarberType | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<selectedBarberType | null>>;
};

export default function BarberSelector({
  selectedOption,
  setSelectedOption,
}: SelectorPropsType) {

  const barbers = useFetchBarbers();

  const renderBarberList = () => {
    return barbers.map((barber) => {
      return (
        <div key={barber.id} className={AppointmentStyle.barberInnerCt}>
          <div className={AppointmentStyle.photoCt}>
            <img
              src={barber.photo}
              alt={`photo of the barber: ${barber.name}`}
            />
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
            <Button onClick={() => setSelectedOption({id: barber.id, name: barber.name, photo: barber.photo})}>
              View Availability
            </Button>
          </div>
        </div>
      );
    });
  };

  const renderChoosedBarber = (selectedBarber: selectedBarberType) => {
    const pickedBarber = barbers.filter((barber) => {
      return barber.id === selectedBarber.id;
    });

    return pickedBarber.map((barber) => {
      return (
        <div
          key={barber.id}
          className="flex flex-col justify-center items-center gap-3"
        >
          <img
            src={barber.photo}
            alt={`Photo of ${barber.name}`}
            className={AppointmentStyle.choosedBarberImg}
          />
          <div className="flex flex-col items-center relative top-[-55px]">
            <div className="text-action text-md">{barber.name}</div>
            <div className="text-[.9rem]">{barber.title}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <article>
      <div className="flex flex-col items-center justify-center">
        {!selectedOption
          ? renderBarberList()
          : renderChoosedBarber(selectedOption)}
      </div>
    </article>
  );
}
