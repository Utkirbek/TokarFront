import If from "@components/smart/If";
import { selectIsInstallment } from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import { Flex, Paper } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { floorLastThreeDigits } from "@utils";
import React from "react";
import { useCart } from "react-use-cart";

import InstallmentForm from "./InstallmentForm";

interface SalesInfoAreaProps {}

const SalesInfoArea: React.FC<SalesInfoAreaProps> = ({}) => {
  const { cartTotal } = useCart();
  const isInstallment = useSalesState(selectIsInstallment);

  return (
    <Flex
      mt={10}
      direction="column"
      mih={"100%"}
      justify="space-between"
      bg="rgba(0, 0, 0, .3)"
      px={5}
      pb={5}
    >
      <Paper my={5}>
        <h1 style={{ textAlign: "center", margin: 4 }}>
          {floorLastThreeDigits(cartTotal)}
        </h1>
      </Paper>
      <If condition={isInstallment}>
        <InstallmentForm />
      </If>
    </Flex>
  );
};

export default SalesInfoArea;
