import React from "react";
import { Skeleton } from "@mui/material";

export const SkeletonItem = () => {
  return (
    <div
      style={{
        maxWidth: "345px",
        margin: "1rem",
      }}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={345}
        height={150}
        sx={{ bgcolor: "grey.900" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ fontSize: "2rem", bgcolor: "grey.900" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
      />
      <Skeleton
        animation="wave"
        variant="text"
        sx={{ fontSize: "1rem", bgcolor: "grey.900" }}
      />
    </div>
  );
};
