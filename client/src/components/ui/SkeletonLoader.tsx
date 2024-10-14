import Skeleton from "@mui/material/Skeleton";

type SkeletonPropsType = {
  numberOfBoxes: number;
  width: string;
  height: string;
  variant?: string;
};

export default function SkeletonLoader({
  numberOfBoxes,
  width,
  height,
  variant,
}: SkeletonPropsType) {

  return Array.from({ length: numberOfBoxes }).map((__, i) => {
    return (
      <Skeleton
        sx={{
          width: '85vw',
          height: height,
          backgroundColor: "rgba(239, 105, 80, .05)",
          variant: variant,
          '@media (min-width: 768px)': {
            width: width,
          }
        }}
        key={i}
        animation="pulse"
      ></Skeleton>
    );
  });
}

