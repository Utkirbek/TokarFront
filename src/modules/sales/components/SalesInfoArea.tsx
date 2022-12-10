import { Flex, Paper } from "@mantine/core";
import { floorLastThreeDigits } from "@utils";
import React from "react";
import { useCart } from "react-use-cart";

interface SalesInfoAreaProps {}

const SalesInfoArea: React.FC<SalesInfoAreaProps> = ({}) => {
  const { cartTotal } = useCart();

  return (
    <Flex
      my={10}
      direction="column"
      mih={"100%"}
      justify="between"
      bg="rgba(0, 0, 0, .3)"
      px={5}
    >
      <Paper my={5}>
        <h1 style={{ textAlign: "center", margin: 4 }}>
          {floorLastThreeDigits(cartTotal)}
        </h1>
      </Paper>
    </Flex>
  );
};

export default SalesInfoArea;
