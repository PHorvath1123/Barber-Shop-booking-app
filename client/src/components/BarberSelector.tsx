import { useFetchBarbersToHome } from "../hook/useFetchBarbersToHome";
import AppointmentStyle from "../styles/appointment/Appointment.module.css";
import Rating from "@mui/material/Rating";
import Button from "../components/ui/Button";

export default function BarberSelector() {
  
  const barbers = useFetchBarbersToHome();

  return (
    <section>
      <h1 className={AppointmentStyle.barberTitle}>
        Choose a <span className="text-action font-title">barber</span>
      </h1>

      <div className="flex flex-col items-center justify-center gap-5">
        {barbers.map(barber => {
            return(
                <div key={barber.name} className={AppointmentStyle.barberInnerCt}>
                    <div className={AppointmentStyle.photoCt}>
                        <img src={barber.photo} alt="photo of the barber" />
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
                                ".css-1c99szj-MuiRating-icon": {
                                color: "#EF6950",
                                },
                                ".MuiRating-iconEmpty": {
                                color: "#D9D9D9",
                                },
                            }}
                            />
                        </div>
                        <Button text={"View Availability"}/>
                    </div>
                </div>
            )
        })}
      </div>
    </section>
  );
}
