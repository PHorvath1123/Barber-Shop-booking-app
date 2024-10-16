import PricingStyle from "../styles/pricing/Pricing.module.css";
import { useFetchServices } from "../hook/useFetchServices";
import SkeletonLoader from "./ui/SkeletonLoader";

export default function PriceList() {
  const { data, isError, error, isLoading } = useFetchServices();

  return isError ? (
    <div className={PricingStyle.errorMessage}>{error.message}</div>
  ) : (
    <div>
      <h1 className="text-center text-lg font-title uppercase mb-[4rem]">
        Pricing List
      </h1>
      <div className={PricingStyle.outerCt}>
        {isLoading &&
          <SkeletonLoader numberOfBoxes={10} width="40vw" height="30px"/>
        }
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
