import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  ScrollArea,
  Select,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  IconCashBanknote,
  IconCheck,
  IconChevronDown,
  IconCreditCard,
  IconTrash,
  IconWallet,
} from "@tabler/icons";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

import useStyles from "./styleCard";

const BuyCart: React.FC<{}> = () => {
  const { classes, cx } = useStyles();
  const [wallet, setWallet] = useState(false);
  const [cardMoney, setCardMoney] = useState(false);

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

  const clickWallet = () => {
    setWallet(!wallet);
  };

  return (
    <>
      {/* <Divider
        orientation="vertical"
        sx={{ height: "100%", position: "absolute" }}
      /> */}
      <Box className={classes.boxHead}>
        <Container>
          <Box>
            <Box className={classes.CardBox}>
              {isEmpty ? (
                <Text className={classes.empty}> Sizda mahsulot qolmadi </Text>
              ) : (
                <ScrollArea style={{ height: 350 }} scrollbarSize={4}>
                  {items.map((item: any) => {
                    return (
                      <Box key={item._id}>
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
                              >
                                -
                              </Button>
                              <Text>{item.quantity}</Text>
                              <Button
                                onClick={() =>
                                  updateItemQuantity(item.id, item.quantity + 1)
                                }
                                className={classes.btnCount}
                                variant={"outline"}
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
                      </Box>
                    );
                  })}
                </ScrollArea>
              )}
            </Box>

            <Box>
              <Card className={classes.cardPrice}>
                <Box className={classes.totalpriceGrup}>
                  <Text sx={{ fontSize: "18px", fontWeight: 900 }}>
                    Umumiy Narxi
                  </Text>
                  <Text sx={{ fontSize: "20px", fontWeight: 900 }}>
                    {cartTotal} USD
                  </Text>
                </Box>

                <Box className={classes.payMoney}>
                  <div>
                    <Text className={classes.payCardTitle}>Naqt pul</Text>
                    <div className={classes.payCard}>
                      <IconCashBanknote size={44} />
                    </div>
                  </div>
                  <div>
                    <Text className={classes.payCardTitle}>Plastik </Text>
                    <div className={classes.payCard}>
                      <IconCreditCard size={44} />
                    </div>
                  </div>
                  <div>
                    <Text className={classes.payCardTitle}>
                      Bo&apos;lib To&apos;lash
                    </Text>
                    <div className={classes.payCard}>
                      <IconWallet size={44} onClick={() => clickWallet()} />
                    </div>
                  </div>
                </Box>
                <Select
                  sx={{ margin: "20px 0" }}
                  placeholder="Kimga "
                  data={[{ value: "users", label: "Foydalanuvchilar chiqadi" }]}
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
              Sotish
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};
export default BuyCart;
