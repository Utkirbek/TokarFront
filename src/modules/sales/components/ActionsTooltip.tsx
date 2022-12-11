import { SalesPrintData } from "@components/print/SalesPrint";
import {
  selectIsInstallment,
  selectSetInstallment,
} from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Kbd,
  Paper,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import salesMethods from "@modules/products/components/buyCart/data";
import useOrders from "@services/hooks/useOrder";
import {
  IconCalendarPlus,
  IconPrinter,
  IconReceiptRefund,
} from "@tabler/icons";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import { SalesFormValues, useSalesFormContext } from "../Sales";

interface ActionsTooltipProps {
  handlePrint: VoidFunction;
}

const ActionsTooltip: React.FC<ActionsTooltipProps> = ({ handlePrint }) => {
  const [, setLastSale] = useLocalStorage<SalesPrintData>({
    key: "last_sale",
  });
  const { clearCartMetadata, emptyCart, cartTotal, items } = useCart();
  const form = useSalesFormContext();

  const setIsInstallment = useSalesState(selectSetInstallment);
  const isInstallment = useSalesState(selectIsInstallment);

  const {
    showErrorNotification,
    showLoadingNotification,
    showSuccessNotification,
  } = useNotification();
  const { addOrder } = useOrders();

  const handleInstallment = () => {
    setIsInstallment(!isInstallment);
  };

  const sell = (values: SalesFormValues) => {
    showLoadingNotification();

    const orderData = {
      total: cartTotal,
      paymentMethod: values.paymentMethod,
      loanTotal:
        isInstallment && values.initialPaymentAmount > 0
          ? cartTotal - values.initialPaymentAmount
          : cartTotal,
      cashTotal: values.initialPaymentAmount,
      shouldPay: values.installmentDate,
      salesman: values.salesman,
      user: values.customer,
      hasLoan: isInstallment,
      cart: items.map((item) => {
        return {
          product: item.id,
          quantity: item.quantity!,
          price: item.price,
        };
      }),
    };

    addOrder(orderData, {
      onSuccess: () => {
        showSuccessNotification();
        setLastSale({
          ...orderData,
          total: values.initialPaymentAmount || cartTotal,
          items: items as any,
        });
        emptyCart();
        clearCartMetadata();
      },
      onError: () => {
        showErrorNotification();
      },
    });
  };

  const handleSell = (event?: React.SyntheticEvent | KeyboardEvent) => {
    form.onSubmit(sell)();
  };

  useHotkeys([
    ["alt+i", handleInstallment],
    ["ctrl + s", handleSell],
    ["alt + s", handleSell],
  ]);

  return (
    <Paper px={5} py={5}>
      <Flex justify={"space-between"}>
        <Group position="left">
          <SegmentedControl
            fullWidth
            color="orange"
            data={salesMethods.map(
              (item: { label: string; value: string }) => ({
                label: <FormattedMessage id={item.label} />,
                value: item.value,
              })
            )}
            {...form.getInputProps("paymentMethod")}
          />
        </Group>
        <Group position="right">
          <Tooltip label="Qaytarish">
            <ActionIcon size={45}>
              <IconReceiptRefund size={35} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={
              <Box>
                Nasiya qilish &nbsp;
                <Kbd>Alt</Kbd> + <Kbd>i</Kbd>
              </Box>
            }
          >
            <ActionIcon size={45} onClick={handleInstallment}>
              <IconCalendarPlus size={35} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={
              <Box>
                Check chiqarish &nbsp;
                <Kbd>Alt</Kbd> + <Kbd>p</Kbd>
              </Box>
            }
          >
            <ActionIcon size={45} onClick={handlePrint}>
              <IconPrinter size={35} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={
              <Box>
                <Kbd>Ctrl</Kbd> + <Kbd>s</Kbd> &nbsp;|&nbsp; <Kbd>Alt</Kbd> +{" "}
                <Kbd>s</Kbd>
              </Box>
            }
          >
            <Button onClick={handleSell}>Sotish</Button>
          </Tooltip>
        </Group>
      </Flex>
    </Paper>
  );
};

export default ActionsTooltip;
