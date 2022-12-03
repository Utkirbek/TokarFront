import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import { Box, Button, clsx, Image, Text } from "@mantine/core";
import { IconMinus, IconPhoto, IconPlus } from "@tabler/icons";
import { getNumber } from "@utils";
import React from "react";
import { useCart } from "react-use-cart";

import useSalesCardStyles from "./ProductsTable/styles/CardStyle";

type Props = {
  data: any[];
};

const CardView: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <Box key={item._id}>
          <SalesCard item={item} />
        </Box>
      ))}
    </>
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
      addItem({
        id: item._id,
        ...item,
        price: getNumber(item?.calculatedPrice) ?? getNumber(item?.price),
      });
    }
  };

  const dec = () => {
    const cartItem = getItem(item._id);
    updateItemQuantity(item._id, cartItem.quantity - 1);
  };

  return (
    <Box
      className={clsx(classes.card, {
        [classes.active]: inCart(item._id),
      })}
    >
      {item.image === "" || null ? (
        <Box
          style={{
            textAlign: "center",
          }}
        >
          <IconPhoto size={95} />
        </Box>
      ) : (
        <Image
          radius="md"
          src={item?.image}
          alt="Random unsplash image"
          width={187}
          height={110}
        />
      )}

      <Box className={classes.cardPadding}>
        <TextEllipsis text={item.title} maxChars={20} />
        <Box className={classes.cardButton}>
          <Text sx={{ fontWeight: "bold" }} fz="sm" fw={500}>
            {getNumber(item?.calculatedPricem) ?? getNumber(item?.price)} UZS
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
