import { useFetchBarbers } from "../hook/useFetchBarbers";
import Rating from "@mui/material/Rating";
import Button from "../components/ui/Button";
import { selectedBarberType } from "../pages/Booking";
import CircularProgressSpinner from "../components/ui/CircularProgressSpinner";

type SelectorPropsType = {
  selectedOption: selectedBarberType | null;
  setSelectedOption: React.Dispatch<
    React.SetStateAction<selectedBarberType | null>
  >;
};

export default function BarberSelector({
  selectedOption,
  setSelectedOption,
}: SelectorPropsType) {
  
  const {
    data: barbers,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useFetchBarbers();

  const renderBarberList = () => {
    if (isLoading) {
      return <CircularProgressSpinner />;
    }

    if (isError) {
      <div className="text-hoverAction mx-auto my-0 w-[80%] text-center text-lg lg:w-[50%]">
        {error.message}
      </div>;
    }

    if (isSuccess) {
      return barbers?.map((barber) => {
        return (
          <div
            key={barber.id}
            className="mx-[.7rem] mt-[3rem] flex h-fit justify-center gap-[2rem] sm:w-[80%]"
          >
            <div className="flex h-fit flex-col items-center justify-between gap-[1.5rem]">
              <img
                className="w-[26vw] sm:max-w-[18vw] md:max-w-[130px]"
                src={barber.photo}
                alt={`photo of the barber: ${barber.name}`}
              />
              <div className="flex flex-col items-center">
                <div className="text-action mb-[.5rem]">{barber.name}</div>
                <div>{barber.title}</div>
              </div>
            </div>
            <div className="flex w-[50%] flex-col items-start justify-between gap-[1.5rem] md:w-fit">
              <p className="hyphens-auto text-justify text-xs tracking-widest sm:leading-[1.7rem] lg:w-[55ch] lg:text-sm">
                {barber.introduction}
              </p>
              <div className="flex flex-col">
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
                onClick={() =>
                  setSelectedOption({
                    id: barber.id,
                    name: barber.name,
                    photo: barber.photo,
                  })
                }
              >
                View Availability
              </Button>
            </div>
          </div>
        );
      });
    }
  };

  const renderChoosedBarber = (selectedBarber: selectedBarberType) => {
    const pickedBarber = barbers?.filter((barber) => {
      return barber.id === selectedBarber.id;
    });

    return pickedBarber?.map((barber) => {
      return (
        <div
          key={barber.id}
          className="flex flex-col items-center justify-center gap-3"
        >
          <img
            src={barber.photo}
            alt={`Photo of ${barber.name}`}
            className="barber-img w-[32vw] sm:max-w-[18vw] md:max-w-[170px]"
          />
          <div className="relative top-[-55px] flex flex-col items-center">
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
