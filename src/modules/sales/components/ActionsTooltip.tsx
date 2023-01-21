import { SalesPrintData } from "@components/print/SalesPrint";
import {
  selectDiscountMode,
  selectIsInstallment,
  selectIsRefund,
  selectRefundOrderId,
  selectSavedSales,
  selectSaveNewSale,
  selectSearchOrderId,
  selectSetDiscountMode,
  selectSetInstallment,
  selectSetIsRefund,
  selectSetSearchOrderId,
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
  Switch,
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
import { isEmptyObject } from "@utils";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import { SalesFormValues, useSalesFormContext } from "../Sales";
import CartStyle from "./CartStyle";

interface ActionsTooltipProps {
  handlePrint: VoidFunction;
  onSearchClear: VoidFunction;
}

const ActionsTooltip: React.FC<ActionsTooltipProps> = ({
  handlePrint,
  onSearchClear,
}) => {
  const [, setLastSale] = useLocalStorage<SalesPrintData>({
    key: "last_sale",
  });
  const { clearCartMetadata, emptyCart, cartTotal, items, isEmpty } = useCart();
  const form = useSalesFormContext();
  const router = useRouter();

  const setIsInstallment = useSalesState(selectSetInstallment);
  const setIsRefund = useSalesState(selectSetIsRefund);
  const isRefund = useSalesState(selectIsRefund);
  const searchOrderId = useSalesState(selectSearchOrderId);
  const isInstallment = useSalesState(selectIsInstallment);
  const setSearchOrderId = useSalesState(selectSetSearchOrderId);
  const refundOrderId = useSalesState(selectRefundOrderId);
  const discountMode = useSalesState(selectDiscountMode);
  const setDiscountMode = useSalesState(selectSetDiscountMode);
  const saveNewSale = useSalesState(selectSaveNewSale);
  const savedSales = useSalesState(selectSavedSales);

  const {
    showErrorNotification,
    showLoadingNotification,
    showSuccessNotification,
  } = useNotification();
  const { addOrder, editOrder } = useOrders();
  const { classes } = CartStyle();

  const handleInstallment = () => {
    if (!isRefund) {
      setIsInstallment(!isInstallment);
    }
  };

  const toggleRefund = () => {
    if (isRefund && searchOrderId) {
      setSearchOrderId("");
      setIsRefund(!isRefund);
      emptyCart();
      clearCartMetadata();
    } else {
      setIsRefund(!isRefund);
    }
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
      cashTotal: isInstallment ? values.initialPaymentAmount : cartTotal,
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
      onSuccess: (data) => {
        showSuccessNotification();
        setLastSale({
          ...orderData,
          total: values.initialPaymentAmount || cartTotal,
          items: items as any,
        });
        emptyCart();
        clearCartMetadata();
        onSearchClear();
      },
      onError: () => {
        showErrorNotification();
      },
    });
  };

  const refund = (values: SalesFormValues) => {
    showLoadingNotification();

    const orderData = {
      total: cartTotal,
      cashTotal: cartTotal,
      salesman: values.salesman,
      cart: items.map((item) => {
        return {
          product: item.id,
          quantity: item.quantity!,
          price: item.price,
        };
      }),
    };

    editOrder(
      {
        id: refundOrderId,
        values: orderData,
      },
      {
        onSuccess: (data) => {
          showSuccessNotification();
          emptyCart();
          clearCartMetadata();
          onSearchClear();
        },
        onError: () => {
          showErrorNotification();
        },
      }
    );
  };

  const handleSell = () => {
    if (!isEmpty) {
      if (searchOrderId) {
        form.onSubmit(refund)();
      } else {
        form.onSubmit(sell)();
      }
    }
  };

  const handleSave = (event: React.SyntheticEvent | KeyboardEvent) => {
    if (!isEmpty) {
      const orderData = {
        date: new Date().toISOString(),
        cart: items,
      };
      saveNewSale(orderData);

      emptyCart();
      clearCartMetadata();
      onSearchClear();
    } else {
      router.push(router.pathname, {
        query: {
          savedSales: true,
        },
      });
    }
  };

  useHotkeys([
    ["alt+i", handleInstallment],
    ["ctrl + s", handleSave],
    ["alt + s", handleSell],
    ["alt + r", toggleRefund],
  ]);

  return (
    <Paper px={5} py={5}>
      <Flex justify={"space-between"} align="center">
        <Group position="left" className={classes.left}>
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
          <Switch
            onLabel="Chegirmali"
            offLabel="Chegirmasiz"
            size="lg"
            sx={{
              "& .mantine-Switch-body": {
                display: "-webkit-inline-box !important",
              },
            }}
            checked={discountMode}
            onChange={(event) => setDiscountMode(event.currentTarget.checked)}
          />
        </Group>
        <Group position="right" className={classes.right}>
          <Tooltip
            label={
              <Box>
                <Kbd>Ctrl</Kbd> + <Kbd>s</Kbd>
              </Box>
            }
          >
            <Button
              onClick={handleSave}
              disabled={isEmptyObject(savedSales) && isEmpty}
            >
              {isEmpty ? "Saqlanganlar" : "Saqlash"}
            </Button>
          </Tooltip>
          <Tooltip
            label={
              <Box>
                Qaytarib berish &nbsp;
                <Kbd>Alt</Kbd> + <Kbd>r</Kbd>
              </Box>
            }
          >
            <ActionIcon size={45} onClick={toggleRefund}>
              <IconReceiptRefund size={35} />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            disabled={isRefund}
            label={
              <Box>
                Nasiya qilish &nbsp;
                <Kbd>Alt</Kbd> + <Kbd>i</Kbd>
              </Box>
            }
          >
            <ActionIcon
              size={45}
              onClick={handleInstallment}
              disabled={isRefund || isEmpty}
            >
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
            <Button onClick={handleSell} disabled={isEmpty}>
              {!!searchOrderId ? "Tasdiqlash" : "Sotish"}
            </Button>
          </Tooltip>
        </Group>
      </Flex>
    </Paper>
  );
};

export default ActionsTooltip;
