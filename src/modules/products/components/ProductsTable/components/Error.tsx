import { Box, Text } from "@mantine/core";
import React from "react";

const Error = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "15%",
        color: "red",
      }}
    >
      <Text sx={{ fontSize: "32px" }}>Xato !</Text>
      <Text sx={{ fontSize: "24px" }}>
        Malumot topilmadi. Iltimos boshqatdan urinb ko&acop;ring
      </Text>
    </Box>
  );
};
export default Error;
