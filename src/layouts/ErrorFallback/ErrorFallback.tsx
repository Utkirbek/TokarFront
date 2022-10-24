import HandsUp from "@assets/icons/HandsUpIcon";
import { Box, Button, Text } from "@mantine/core";
import React from "react";

type Props = {
  error: Error;
  resetErrorBoundary: () => void;
};

const ErrorFallback: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      role={"alert"}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      mx="auto"
    >
      <Box
        sx={{
          width: "80vw",
          maxWidth: "500px",
        }}
      >
        <HandsUp />
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Text sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
          Something went wrong:
        </Text>
        <Text component="pre" color={"red"}>
          {error.message}
        </Text>
        <Button variant="gradient" onClick={resetErrorBoundary}>
          Try again
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorFallback;
