import { Box, Button, Grid, Image, Text } from "@mantine/core";
import { IconMinus, IconPhoto, IconPlus } from "@tabler/icons";
import React from "react";
import { useCart } from "react-use-cart";

import useSalesCardStyles from "./ProductsTable/components/card/CardStyle";

type Props = {
  data: any[];
};

const CardView: React.FC<Props> = ({ data }) => {
  return (
    <Grid>
      {data.map((item) => (
        <Grid.Col key={item._id} span={2}>
          <SalesCard item={item} />
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default CardView;

const SalesCard: React.FC<{ item: any }> = ({ item }) => {
  const { addItem, updateItemQuantity, getItem, inCart } = useCart();
  const { classes } = useSalesCardStyles();

  const handleAddToCart = () => {
    if (inCart(item._id)) {
      const cartItem = getItem(item._id);
      updateItemQuantity(item._id, cartItem.quantity + 1);
    } else {
      addItem({ id: item._id, ...item });
    }
  };

  const dec = () => {
    const cartItem = getItem(item._id);
    updateItemQuantity(item._id, cartItem.quantity - 1);
  };

  return (
    <Box className={classes.card}>
      {item.image === "" || null ? (
        <Box
          style={{
            textAlign: "center",
          }}
        >
          <IconPhoto size={85} />
        </Box>
      ) : (
        <Image
          radius="md"
          src={item.image}
          alt="Random unsplash image"
          width={178}
          height={120}
        />
      )}

      <Box className={classes.cardPadding}>
        <Text>{item.title}</Text>
        <Box className={classes.cardButton}>
          <Text sx={{ fontWeight: "bold" }} fz="sm" fw={500}>
            {item.price} {item.currency?.name}
          </Text>
          <Button.Group>
            <Button
              variant="outline"
              size="xs"
              disabled={!inCart(item._id)}
              onClick={dec}
            >
              <IconMinus size={"xs"} />
            </Button>
            <Button size="xs" onClick={handleAddToCart} variant="gradient">
              <IconPlus size={"xs"} />
            </Button>
          </Button.Group>
        </Box>
      </Box>
    </Box>
  );
};
