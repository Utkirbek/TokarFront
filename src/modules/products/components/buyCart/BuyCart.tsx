import "dayjs/locale/uz-latn";

import ComponentToPrint from "@components/print/ComponentToPrint";
import { SelectWithCreate } from "@components/SelectWithCreate";
import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import WithLoading from "@hoc/WithLoading";
import useUser from "@hooks/shared/useUser";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Checkbox,
  NumberInput,
  ScrollArea,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { FieldLoader } from "@modules/payments/components/PaymentForm";
import useOrders from "@services/hooks/useOrder";
import useUsers from "@services/hooks/useUser";
import { IconTrash } from "@tabler/icons";
import React, { useRef } from "react";
import { FormattedMessage, FormattedNumber, useIntl } from "react-intl";
import { useReactToPrint } from "react-to-print";
import { useCart } from "react-use-cart";

import ContentEditable from "../contentEditable/ContentEditable";
import salesMethods from "./data";
import useStyles from "./styleCard";

const BuyCart: React.FC<{}> = () => {
  const { classes } = useStyles();
  const componentRef = useRef(null);

  const intl = useIntl();
  const { addOrder } = useOrders();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { useFetchUsers, addUser } = useUsers();
  const { _id } = useUser();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { isEmpty, items, removeItem, cartTotal, emptyCart, updateItem } =
    useCart();

  const form = useForm({
    initialValues: {
      paymentMethod: "cash",
      customer: "",
      intialPayment: null,
      hasLoan: false,
    },
  });

  const handleSell = (values: any) => {
    showLoadingNotification();
    addOrder(
      {
        total: cartTotal,
        paymentMethod: values.paymentMethod,
        loanTotal:
          values.hasLoan && values.intialPayment > 0
            ? cartTotal - values.intialPayment
            : cartTotal,
        cashTotal: values.intialPayment,
        shouldPay: values.paymentDate,
        salesman: _id,
        user: values.customer,
        hasLoan: values.hasLoan,
        cart: items.map((item) => {
          return {
            product: item.id,
            quantity: item.quantity!,
            price: item.price,
          };
        }),
      },
      {
        onSuccess: () => {
          showSuccessNotification();
          handlePrint();
          emptyCart();
        },
        onError: () => {
          showErrorNotification();
        },
      }
    );
  };

  const fetchUsersQuery = useFetchUsers();

  if (isEmpty) {
    return (
      <Text className={classes.empty}>
        <FormattedMessage id="products.buyCart.maxsulotYoq" />
      </Text>
    );
  }

  return (
    <>
      <Box
        className={classes.boxHead}
        component="form"
        onSubmit={form.onSubmit(handleSell)}
      >
        <Box className={classes.CardBox}>
          <ScrollArea style={{ height: "50vh" }} scrollbarSize={4}>
            {items?.map((item: any) => {
              return (
                <Card p={"xs"} className={classes.card} key={item._id}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TextEllipsis text={item?.title} maxChars={60} />
                    <ActionIcon>
                      <IconTrash
                        color="red"
                        cursor={"pointer"}
                        onClick={() => removeItem(item._id)}
                      />
                    </ActionIcon>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text>
                      <ContentEditable
                        value={item.quantity}
                        onFinish={(value) => {
                          updateItem(item._id, {
                            quantity: value,
                          });
                        }}
                        style={{
                          border: "0.2px solid",
                          padding: "0 5px",
                        }}
                      />
                      {item.unit}
                      &nbsp;
                      <ContentEditable
                        value={(+item?.price).toFixed(0)}
                        onFinish={(value) => {
                          updateItem(item._id, {
                            price: value,
                          });
                        }}
                        style={{
                          border: "0.2px solid",
                          padding: "0 5px",
                        }}
                      />
                      <span>&nbsp;So&apos;m</span>
                    </Text>
                    <Text sx={{ fontWeight: "bold" }}>
                      <ContentEditable
                        value={(item.price * item.quantity).toFixed(0)}
                        onFinish={(val) => {
                          const price = +val / item.quantity;
                          updateItem(item._id, {
                            price,
                          });
                        }}
                        style={{
                          border: "0.2px solid",
                          padding: "0 5px",
                        }}
                      />
                      <span>&nbsp;So&apos;m</span>
                    </Text>
                  </Box>
                </Card>
              );
            })}
          </ScrollArea>
        </Box>

        <Box mt={20}>
          <Card className={classes.cardPrice}>
            <Box className={classes.totalpriceGrup}>
              <Text sx={{ width: "80%", fontSize: "18px", fontWeight: 900 }}>
                <FormattedMessage id="products.buyCart.totalPrice" />
              </Text>
              <FormattedNumber
                style="currency"
                currency="UZS"
                value={cartTotal}
              />
            </Box>
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
            <Checkbox
              mt={"md"}
              label={<FormattedMessage id="products.buyCart.loan" />}
              {...form.getInputProps("hasLoan")}
            />
            <WithLoading
              query={fetchUsersQuery}
              FallbackLoadingUI={FieldLoader}
            >
              <SelectWithCreate
                label="products.buyCart.whom"
                placeholder="products.buyCart.whom"
                data={fetchUsersQuery.data?.map((user: any) => {
                  return {
                    value: user._id,
                    label: user.name,
                  };
                })}
                registerAs="customer"
                form={form}
                onCreate={(value) => {
                  //TODO modal chiqarib user yaratish imkonini shu yerda berish kerak
                }}
              />
            </WithLoading>
            {!!form.values.hasLoan && (
              <>
                <NumberInput
                  label={intl.formatMessage({
                    id: "products.buyCart.initialPayment",
                  })}
                  {...form.getInputProps("intialPayment")}
                  precision={2}
                  hideControls
                />
                <DatePicker
                  defaultValue={new Date()}
                  locale="uz-latn"
                  dropdownType="modal"
                  placeholder={intl.formatMessage({
                    id: "products.buyCart.date",
                  })}
                  label={intl.formatMessage({
                    id: "products.buyCart.date",
                  })}
                  {...form.getInputProps("paymentDate")}
                />
              </>
            )}
          </Card>
          <Button
            disabled={!form.isValid}
            className={classes.buyBtn}
            type="submit"
          >
            <FormattedMessage id="products.buyCart.sale" />
          </Button>
        </Box>
        <ComponentToPrint ref={componentRef} />
      </Box>
    </>
  );
};
export default BuyCart;
