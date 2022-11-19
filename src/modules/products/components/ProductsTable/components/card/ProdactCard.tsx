import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import { Box, Button, Flex, Grid, Image, Loader, Text } from "@mantine/core";
import BuyCart from "@modules/products/components/buyCart/BuyCart";
import { IconPhoto } from "@tabler/icons";
import { memo } from "react";
import { FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import useStyles from "./CardStyle";

function ProdactCard({ data }: any) {
  const { addItem, isEmpty } = useCart();
  const { classes } = useStyles();
  const handleOpenCartBuy = (el: any) => {
    addItem({ id: el._id, ...el });
  };
  if (!data) return <Loader sx={{ margin: "20%  45%" }} size={"xl"} />;
  if (data?.length === 0) return <EmptyBox />;

  return (
    <Grid
      style={{
        marginTop: "20px",
      }}
    >
      <Grid.Col span={isEmpty ? 12 : 8}>
        <Flex wrap="wrap" justify="flex-start" gap="xl">
          {data.map((item: any) => {
            return (
              <Box key={item._id} className={classes.card}>
                {item.image === "" || null ? (
                  <Box
                    style={{
                      textAlign: "center",
                      margin: "15px 0px",
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
                  <Box className={classes.cardFlex}>
                    <Text
                      style={{
                        textTransform: "lowercase",
                      }}
                    >
                      {item.title.length > 9 ? (
                        <Text>{item.title.substring(0, 9)}...</Text>
                      ) : (
                        <Text>{item.title}</Text>
                      )}
                    </Text>
                    <Text fz="sm" fw={500}>
                      {item.price} {item.currency.name}
                    </Text>
                  </Box>
                  <Box className={classes.cardButton}>
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => handleOpenCartBuy(item)}
                    >
                      <FormattedMessage id="buyCart.sotish" />
                    </Button>
                    <Text>
                      {item.code}_
                      <FormattedMessage id="buyCart.kodi" />
                    </Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
      </Grid.Col>
      {!isEmpty && (
        <Grid.Col span={4}>
          <BuyCart />
        </Grid.Col>
      )}
    </Grid>
  );
}

export default memo(ProdactCard);
