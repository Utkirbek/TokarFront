import { Avatar, Box, Button, Card, SimpleGrid, Text } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";

import useStyles from "../components/orderStyle";

type Props = { data?: any };

function DetailCard({ data }: Props) {
  const router = useRouter();

  const { classes } = useStyles();
  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(data, query.details as string);

  return (
    <SimpleGrid
      cols={4}
      spacing="md"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: "sm" },
        { maxWidth: 780, cols: 2, spacing: "xs" },
        { maxWidth: 540, cols: 1, spacing: "xs" },
      ]}
    >
      {item?.cart.map((prodItem: any) => {
        return (
          <Box className={classes.cardBox} key={item._id}>
            <Box style={{ paddingTop: "8px" }}>
              <Box className={classes.top}>
                <Avatar
                  src={item.product?.image ? `${item?.image}` : ""}
                  alt="it's me"
                />
                <Link style={{ textAlign: "end" }} href={"/products"}>
                  {prodItem?.product === null ? (
                    <FormattedMessage id="orders.userNull" />
                  ) : (
                    prodItem?.product?.title
                  )}
                </Link>
              </Box>
              <Box mt={15}>
                <Box>Kod {prodItem?.product?.code}</Box>
                <Box>
                  Narxi{" "}
                  {prodItem === null ? (
                    <FormattedMessage id="orders.userNull" />
                  ) : (
                    prodItem?.price
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

export default DetailCard;

const findItem = (orders: any[], id: any) => {
  return orders?.find((item: any) => item._id === id);
};
