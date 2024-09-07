import PricingStyle from "../styles/pricing/Pricing.module.css";
import Skeleton from "@mui/material/Skeleton";
import { useFetchServices } from "../hook/useFetchServices";

export default function PriceList() {
  const { data, isError, error, isLoading } = useFetchServices();

  return isError ? (
    <div>An error has occured: {error.message}</div>
  ) : (
    <div>
      <h1 className="text-center text-lg font-title uppercase mb-[4rem]">
        Pricing List
      </h1>
      <div className={PricingStyle.outerCt}>
        {isLoading &&
          Array.from({ length: 10 }).map((__, i) => {
            return (
              <Skeleton
                sx={{
                  width: "40vw",
                  height: "30px",
                  backgroundColor: "rgba(239, 105, 80, .05)",
                }}
                key={i}
                animation="pulse"
              ></Skeleton>
            );
          })}
        {data?.map((category) => {
          return (
            <div key={category.category} className={PricingStyle.categoryCt}>
              <h2 className={PricingStyle.categoryTitle}>
                {category.category}
              </h2>
              {category.services.map((service) => (
                <div key={service.title} className={PricingStyle.priceList}>
                  <div className={PricingStyle.listItem}>
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
