import {
  Box,
  Button,
  Card,
  Container,
  ScrollArea,
  Select,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconChevronDown, IconTrash } from "@tabler/icons";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useCart } from "react-use-cart";

import datas from "./data";
import useStyles from "./styleCard";

const BuyCart: React.FC<{}> = () => {
  const { classes, cx } = useStyles();
  const [wallet, setWallet] = useState(false);
  const [cardMoney, setCardMoney] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const intl = useIntl();

  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    updateItemQuantity,
    removeItem,
    cartTotal,
    emptyCart,
    getItem,
  } = useCart();

  const form = useForm({
    initialValues: {
      status: "",
    },
  });
  const activeStyle = {
    background: "#1864AB",
    color: "white",
    borderRadius: "10px",
  };
  const handleClick = (id: any) => () => {
    setActiveId(id);
  };
  const buy = () => {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Iltimos kuting",
      message: "Sizning mahsuloringiz qo'shilmoqda iltimos kuting",
      disallowClose: true,
    });
    updateNotification({
      id: "load-data",
      color: "teal",
      title: "Muaffaqiyatli",
      message: "Sizning mahsuloringiz Sotilganlar ro'yxatiga qo'shildi",
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
  };
  const clickWallet = ({ item }: any) => {
    item.bolin === true ? setWallet(!wallet) : "";
  };

  return (
    <>
      <Box className={classes.boxHead}>
        <Container>
          <Box>
            <Box className={classes.CardBox}>
              {isEmpty ? (
                <Text className={classes.empty}>
                  <FormattedMessage id="buyCart.maxsulotYoq" />
                </Text>
              ) : (
                <ScrollArea style={{ height: 350 }} scrollbarSize={4}>
                  {items.map((item: any) => {
                    return (
                      <Card className={classes.card} key={item._id}>
                        <Text>{item.title}</Text>
                        <Text>{item.price}</Text>

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
                            <Text size="xl">{item.quantity}</Text>
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
                    <FormattedMessage id="buyCart.jamiSuma" />
                  </Text>
                  <Text sx={{ fontSize: "20px", fontWeight: 900 }}>
                    {cartTotal} USD
                  </Text>
                </Box>

                <Box className={classes.payMoney}>
                  {datas?.map((item: any, index: any) => {
                    return (
                      <div key={index}>
                        <Text className={classes.payCardTitle} size="sm">
                          <FormattedMessage id={item.title} />
                        </Text>
                        <Box
                          className={classes.cardSuma}
                          style={item.id === activeId ? activeStyle : {}}
                          onClick={handleClick(item.id)}
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
                  placeholder={intl.formatMessage({ id: "buyCart.kimga" })}
                  data={[
                    {
                      value: "users",
                      label: intl.formatMessage({
                        id: "foydalanuvchi.foydalanuv",
                      }),
                    },
                  ]}
                />
                {!!wallet ? (
                  <Select
                    sx={{ width: "100%", margin: "10px  0" }}
                    rightSection={<IconChevronDown size={14} />}
                    rightSectionWidth={30}
                    styles={{ rightSection: { pointerEvents: "none" } }}
                    data={[
                      "1 hafta",
                      "1 oy",
                      " 1-3 oy",
                      "3-6 oy",
                      "6 dan yuqori",
                    ]}
                    defaultValue="1 hafta"
                  />
                ) : null}
              </Card>
            </Box>
            <Button className={classes.buyBtn} onClick={() => buy()}>
              <FormattedMessage id="buyCart.sotish" />
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default BuyCart;
