import If from "@components/smart/If";
import {
  selectIsInstallment,
  selectIsRefund,
  selectSetSearchOrderId,
} from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import {
  ActionIcon,
  Box,
  Flex,
  Paper,
  Stack,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons";
import { floorLastThreeDigits } from "@utils";
import React from "react";
import { useCart } from "react-use-cart";

import InstallmentForm from "./InstallmentForm";

interface SalesInfoAreaProps {}

const SalesInfoArea: React.FC<SalesInfoAreaProps> = ({}) => {
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  const { cartTotal } = useCart();

  const isRefund = useSalesState(selectIsRefund);
  const setSearchOrderId = useSalesState(selectSetSearchOrderId);

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
      <Stack>
        <Paper my={5}>
          <h1 style={{ textAlign: "center", margin: 4 }}>
            {floorLastThreeDigits(cartTotal)}
          </h1>
        </Paper>
        <If condition={isRefund}>
          <TextInput
            label="Savdo Raqami"
            name="order_id"
            placeholder="Savdo raqami"
            ref={searchInputRef}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                setSearchOrderId(searchInputRef.current?.value || "");
              }
            }}
            rightSection={
              <Box>
                <Tooltip label={"Qidirish"}>
                  <ActionIcon
                    onClick={() => {
                      setSearchOrderId(searchInputRef.current?.value || "");
                    }}
                  >
                    <IconSearch />
                  </ActionIcon>
                </Tooltip>
              </Box>
            }
          />
        </If>
      </Stack>

      <InstallmentForm />
    </Flex>
  );
};

export default SalesInfoArea;
