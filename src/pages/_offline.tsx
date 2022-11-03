import { Box, Text } from "@mantine/core";

const _offline = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box>
        <h1>Intertda uzilish!</h1>
        <Text sx={{ fontSize: "2rem" }}>
          Internetga ulanishda muammo yuz berdi. Internetga ulanishni tekshiring
        </Text>
      </Box>
    </Box>
  );
};

export default _offline;
