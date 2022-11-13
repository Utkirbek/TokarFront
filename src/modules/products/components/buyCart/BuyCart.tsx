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
import loan from "@modules/loan";
import usePayments from "@services/hooks/usePayments";
import { IconTrash } from "@tabler/icons";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
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

  const {
    isEmpty,
    items,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
    getItem,
    totalItems,
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

  return (
    <>
      <Box className={classes.boxHead}>
        <Container>
          <Box>
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
                        {item.title.length > 8 ? (
                          <Text>{item.title.substring(0, 8)}...</Text>
                        ) : (
                          <Text>{item.title}</Text>
                        )}

                        <Text>
                          {item.price}_{item.currency?.name}
                        </Text>

                        <Box className={classes.boxGroupCountTrash}>
                          <Box className={classes.counter}>
                            <Button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                              className={classes.btnCount}
                              variant={"outline"}
                              compact
                            >
                              -
                            </Button>
                            <Text size="md">{item.quantity}</Text>
                            <Button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                              className={classes.btnCount}
                              variant={"outline"}
                              compact
                            >
                              +
                            </Button>
                          </Box>
                          <IconTrash
                            className={classes.trash}
                            onClick={() => removeItem(item.id)}
                          />
                        </Box>
                      </Card>
                    );
                  })}
                </ScrollArea>
              )}
            </Box>

            <Box>
              <Card className={classes.cardPrice}>
                <Box className={classes.totalpriceGrup}>
                  <Text sx={{ fontSize: "18px", fontWeight: 900 }}>
                    <FormattedMessage id="products.buyCart.totalPrice" />
                  </Text>
                  <Text sx={{ fontSize: "20px", fontWeight: 900 }}>
                    {cartTotal}
                  </Text>
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
                  sx={{ margin: "20px 0" }}
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
            </Box>
            <Button
              className={classes.buyBtn}
              onClick={() =>
                handleSubmit({
                  amount: cartTotal,
                  paymentMethod: paymenttitle,
                  salesman: salesmanTitle,
                  loan: loanTitle,
                })
              }
            >
              <FormattedMessage id="products.buyCart.sale" />
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default BuyCart;
