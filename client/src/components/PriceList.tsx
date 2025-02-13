import { useFetchServices } from "../hook/useFetchServices";
import SkeletonLoader from "./ui/SkeletonLoader";

export default function PriceList() {
  const { data, isError, error, isLoading } = useFetchServices();

  return isError ? (
    <div className="text-hoverAction mx-auto my-0 w-[80%] text-center text-lg lg:w-[50%]">
      {error.message}
    </div>
  ) : (
    <div>
      <h1 className="font-title mb-[4rem] text-center text-lg uppercase">
        Pricing List
      </h1>
      <div className="mx-[2rem] flex flex-col items-center gap-[3rem]">
        {isLoading && (
          <SkeletonLoader numberOfBoxes={10} width="40vw" height="30px" />
        )}
        {data?.map((category) => {
          return (
            <div
              key={category.category}
              className="flex w-[85vw] flex-col gap-2 md:w-[40vw]"
            >
              <h2 className="text-md font-title after:border-action relative mb-[2rem] w-fit after:absolute after:left-[20px] after:top-[30px] after:w-[100%] after:border after:border-dashed">
                {category.category}
              </h2>
              {category.services.map((service) => (
                <div key={service.title} className="flex flex-col">
                  <div className="mb-[1rem] flex flex-row justify-between border-b border-dashed">
                    <span className="text-sm">{service.title}</span>
                    <span>{service.price} $</span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
