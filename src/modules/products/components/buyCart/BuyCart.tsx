import ComponentToPrint from "@components/print/ComponentToPrint";
import useNotification from "@hooks/useNotification";
import {
  Box,
  Button,
  Card,
  Container,
  ScrollArea,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import usePayments from "@services/hooks/usePayments";
import { IconTrash } from "@tabler/icons";
import React, { useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useReactToPrint } from "react-to-print";
import { useCart } from "react-use-cart";

import datas from "./data";
import useStyles from "./styleCard";

const BuyCart: React.FC<{}> = () => {
  const { classes, cx } = useStyles();
  const [wallet, setWallet] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [paymenttitle, setPaymentTitle] = useState("");
  const [loan, loanTitle] = useState("");
  const [salesmen, salesmanTitle] = useState("");
  const intl = useIntl();
  const { addPayments } = usePayments();
  const { showLoadingNotification, showSuccessNotification } =
    useNotification();
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
    getItem,
    totalItems,
    inCart,
  } = useCart();

  const form = useForm({
    initialValues: {
      amount: "",
      paymentMethod: "",
    },
  });

  const activeStyle = {
    background: "#1864AB",
    color: "white",
    borderRadius: "10px",
  };

  const handleSubmit = async (values: {
    amount: any;
    paymentMethod: string;
    salesman: any;
    loan: any;
  }) => {
    addPayments(
      values,

      {
        onSuccess: () => {
          showSuccessNotification();
        },
        onError: () => {
          showLoadingNotification;
        },
      }
    );
    showLoadingNotification();
  };
  const buy = () => {
    showSuccessNotification;
    showLoadingNotification;
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
      salesman: salesmanTitle,
      loan: loanTitle,
    });
  }

  return (
    <>
      <Box className={classes.boxHead}>
        <Box className={classes.CardBox}>
          {isEmpty ? (
            <Text className={classes.empty}>
              <FormattedMessage id="products.buyCart.maxsulotYoq" />
            </Text>
          ) : (
            <ScrollArea style={{ height: 250 }} scrollbarSize={4}>
              {items.map((item: any) => {
                return (
                  <Card className={classes.card} key={item._id}>
                    <Box sx={{ display: "flex" }}>
                      <IconTrash
                        color="red"
                        cursor={"pointer"}
                        onClick={() => removeItem(item._id)}
                        className={classes.icon}
                      />
                      <Text>
                        {item.title.substring(0, 50)}... {item.quantity}x
                      </Text>
                    </Box>
                    <Text contentEditable>
                      {item.price * item.quantity}So&apos;m
                    </Text>
                  </Card>
                );
              })}
            </ScrollArea>
          )}
        </Box>

        <Box>
          <Card className={classes.cardPrice}>
            <Box className={classes.totalpriceGrup}>
              <Text sx={{ width: "80%", fontSize: "18px", fontWeight: 900 }}>
                <FormattedMessage id="products.buyCart.totalPrice" />
              </Text>
              <Text sx={{ fontSize: "20px", fontWeight: 700 }}>
                {cartTotal}
              </Text>
              <Text sx={{ fontSize: "20px", fontWeight: 700 }}>UZS</Text>
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
            <Select
              sx={{ margin: "10px 0" }}
              placeholder={intl.formatMessage({
                id: "products.buyCart.whom",
              })}
              data={[
                {
                  value: "users",
                  label: intl.formatMessage({
                    id: "products.userShow",
                  }),
                },
              ]}
            />
            {!!wallet ? (
              <TextInput
                label={intl.formatMessage({
                  id: "products.buyCart.enterDay",
                })}
                placeholder={intl.formatMessage({
                  id: "products.buyCart.enterDay",
                })}
                {...form.getInputProps("payDay")}
                required
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
