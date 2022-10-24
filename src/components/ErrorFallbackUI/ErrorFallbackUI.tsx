import HandsUp from "@assets/icons/HandsUpIcon";
import { Box, Text } from "@mantine/core";
import { FormattedMessage } from "react-intl";

type Props = {
  message: string;
};

const ErrorFallbackUI = (props: Props) => {
  //TODO Qayta design qilinsin

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
          <FormattedMessage id="sthWentWrong" />
        </Text>
        <Text component="pre" color={"red"}>
          {props.message}
        </Text>
      </Box>
    </Box>
  );
};

export default ErrorFallbackUI;
