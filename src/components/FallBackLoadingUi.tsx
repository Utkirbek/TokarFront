import { Box, Loader } from "@mantine/core";
import React from "react";

const FallBackLoadingUi = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Loader />
    </Box>
  );
};

export default FallBackLoadingUi;
