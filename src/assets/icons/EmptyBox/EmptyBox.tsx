import { Box, Center, Text } from "@mantine/core";
import React from "react";
import { FormattedMessage } from "react-intl";

function EmptyBox() {
  return (
    <Box>
      <Center style={{ cursor: "pointer" }}>
        <lord-icon
          src="https://cdn.lordicon.com/vutipfgy.json"
          trigger="hover"
          style={{
            width: "400px",
            height: "400px",
          }}
        ></lord-icon>
      </Center>
      <Text align="center" size="xl">
        <FormattedMessage id="emptyBox.boxTitle" />
      </Text>
    </Box>
  );
}

export default EmptyBox;
