import {
  Box,
  Button,
  Card,
  CloseButton,
  Container,
  ScrollArea,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import {
  IconCashBanknote,
  IconCheck,
  IconCreditCard,
  IconTrash,
  IconWallet,
} from "@tabler/icons";
import React, { useState } from "react";
import { useCart } from "react-use-cart";

import useStyles from "./styleCard";

const BuyCart: React.FC<{
  handleCloseCartBuy: () => void;
  dates: any;
}> = ({ handleCloseCartBuy, dates }) => {
  const { classes, cx } = useStyles();
  const [count, setCount] = useState(1);
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

  return (
    <Box className={classes.boxHead}>
      <CloseButton
        title="Close popover"
        size="xl"
        iconSize={20}
        my={"ms"}
        sx={{ marginLeft: "340px" }}
        onClick={() => handleCloseCartBuy()}
      />
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
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity - 1)
                              }
                              className={classes.btnCount}>
                              -
                            </button>
                            <Text>{item.quantity}</Text>
                            <button
                              onClick={() =>
                                updateItemQuantity(item.id, item.quantity + 1)
                              }
                              className={classes.btnCount}>
                              +
                            </button>
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
          {isEmpty ? null : (
            <Button onClick={() => emptyCart()} mb={"lg"} variant="outline">
              Xammasini Tozalash
            </Button>
          )}

          <Box>
            <Card className={classes.cardPrice}>
              <Box className={classes.info}>
                <Text sx={{ fontSize: "20px", fontWeight: 900 }}>
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
                    <IconWallet size={44} />
                  </div>
                </div>
              </Box>
            </Card>
          </Box>
          <Button className={classes.buyBtn} onClick={() => buy()}>
            {" "}
            Sotish
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
export default BuyCart;
