import "dayjs/locale/uz-latn";

import ComponentToPrint from "@components/print/ComponentToPrint";
import WithLoading from "@hoc/WithLoading";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  ScrollArea,
  Select,
  Text,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { FieldLoader } from "@modules/payments/components/PaymentForm";
import usePayments from "@services/hooks/usePayments";
import useUsers from "@services/hooks/useUser";
import { IconTrash } from "@tabler/icons";
import React, { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useReactToPrint } from "react-to-print";
import { useCart } from "react-use-cart";

import datas from "./data";
import useStyles from "./styleCard";

const activeStyle = {
  background: "#1864AB",
  color: "white",
  borderRadius: "10px",
};

const BuyCart: React.FC<{}> = () => {
  const { classes, cx } = useStyles();
  const [wallet, setWallet] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [paymenttitle, setPaymentTitle] = useState("");
  const intl = useIntl();
  const { addPayments } = usePayments();
  const { showLoadingNotification, showSuccessNotification } =
    useNotification();
  const componentRef = useRef(null);
  const { useFetchUsers } = useUsers();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const { isEmpty, items, removeItem, cartTotal } = useCart();

  const form = useForm({
    initialValues: {
      amount: "",
      paymentMethod: "",
      paymentDate: new Date(),
    },
  });

  const handleSubmit = async (values: {
    amount: any;
    paymentMethod: string;
    salesman: any;
    loan: any;
  }) => {
    addPayments(values, {
      onSuccess: () => {
        showSuccessNotification();
      },
      onError: () => {
        showLoadingNotification;
      },
    });
    showLoadingNotification();
  };

  const handleClick = (item: any) => () => {
    setActiveId(item.id);
    setPaymentTitle(item.title);
  };

  const clickWallet = ({ item }: any) => {
    item.bolin === true ? setWallet(true) : setWallet(false);
  };

  function add() {
    handlePrint;
    handleSubmit({
      amount: cartTotal,
      paymentMethod: paymenttitle,
      salesman: null,
      loan: null,
    });
  }

  const fetchUsersQuery = useFetchUsers();

  return (
    <>
      <Box className={classes.boxHead}>
        <Box className={classes.CardBox}>
          {isEmpty ? (
            <Text className={classes.empty}>
              <FormattedMessage id="products.buyCart.maxsulotYoq" />
            </Text>
          ) : (
            <ScrollArea style={{ height: "50vh" }} scrollbarSize={4}>
              {items.map((item: any) => {
                return (
                  <Card p={"xs"} className={classes.card} key={item._id}>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Text
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "90%",
                        }}
                      >
                        {item.title.substring(0, 60)}
                      </Text>
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
                        {item.quantity}x {item.price.toFixed(2)}
                        <span>&nbsp;So&apos;m</span>
                      </Text>
                      <Text sx={{ fontWeight: "bold" }}>
                        <span
                          suppressContentEditableWarning
                          contentEditable
                          style={{
                            border: "0.2px solid",
                            padding: "0 5px",
                          }}
                        >
                          {item.price.toFixed(2) * item.quantity}{" "}
                        </span>
                        <span>&nbsp;So&apos;m</span>
                      </Text>
                    </Box>
                  </Card>
                );
              })}
            </ScrollArea>
          )}
        </Box>

        <Box mt={20}>
          <Card className={classes.cardPrice}>
            <Box className={classes.totalpriceGrup}>
              <Text sx={{ width: "80%", fontSize: "18px", fontWeight: 900 }}>
                <FormattedMessage id="products.buyCart.totalPrice" />
              </Text>
              <Text sx={{ fontSize: "20px", fontWeight: 700 }}>
                {cartTotal}
              </Text>
              <Text sx={{ fontSize: "20px", fontWeight: 700 }}>&nbsp;UZS</Text>
            </Box>

            <Box className={classes.payMoney}>
              {datas?.map((item: any, index: any) => {
                return (
                  <div key={index}>
                    <Text className={classes.payCardTitle}>
                      <FormattedMessage id={item.title} />
                    </Text>
                    <Box
                      className={classes.cardSuma}
                      style={item.id === activeId ? activeStyle : {}}
                      onClick={handleClick(item)}
                    >
                      <item.icon
                        size={50}
                        onClick={() => clickWallet({ item })}
                      />
                    </Box>
                  </div>
                );
              })}
            </Box>
            <WithLoading
              query={fetchUsersQuery}
              FallbackLoadingUI={FieldLoader}
            >
              <Select
                sx={{ margin: "10px 0" }}
                placeholder={intl.formatMessage({
                  id: "products.buyCart.whom",
                })}
                label={intl.formatMessage({ id: "products.buyCart.whom" })}
                data={fetchUsersQuery.data?.map((user: any) => {
                  return {
                    value: user._id,
                    label: user.name,
                  };
                })}
              />
            </WithLoading>
            {!!wallet ? (
              <DatePicker
                locale="uz-latn"
                placeholder={intl.formatMessage({
                  id: "products.buyCart.date",
                })}
                label={intl.formatMessage({
                  id: "products.buyCart.date",
                })}
                {...form.getInputProps("paymentDate")}
              />
            ) : null}
          </Card>
          <Button className={classes.buyBtn} onClick={handlePrint}>
            <FormattedMessage id="products.buyCart.sale" />
          </Button>
          <Box
            style={{
              display: "none",
            }}
          >
            <ComponentToPrint ref={componentRef} />
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default BuyCart;
