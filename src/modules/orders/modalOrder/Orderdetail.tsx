import { Box, Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";

import useStyles from "./orderStyle";

type Props = {
  data?: any;
};

const OrdersDetails = ({ data }: Props) => {
  const router = useRouter();
  const { classes } = useStyles();
  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(data, query.details as string);

  return (
    <Modal size={"95%"} opened={!!item} onClose={() => router.back()}>
      <Text className={classes.titleHead}>
        <FormattedMessage id="OrdersDetail.titleHead" />
      </Text>
      <Box className={classes.itemGroup}>
        <Box className={classes.imageBox}>
          <Text className={classes.title}>
            <FormattedMessage id="OrdersDetail.orderUser" />
          </Text>
          <Text className={classes.reight}>{item?.user?.name}</Text>
        </Box>

        <Box className={classes.info}>
          <Box className={classes.left}>
            <Text className={classes.title}>
              <FormattedMessage id="OrdersDetail.ordersSalesmen" />
            </Text>
            <Text>
              <FormattedMessage id="OrdersDetail.ordersProductId" />
            </Text>
            <Text>
              <FormattedMessage id="OrdersDetail.ordersQuantity" />
            </Text>
            <Text>
              <FormattedMessage id="OrdersDetail.ordersPrice" />
            </Text>
            <Text>
              <FormattedMessage id="OrdersDetail.createOrder" />
            </Text>
            <Text>
              <FormattedMessage id="OrdersDetail.updateOrder" />
            </Text>
            <Text>
              <FormattedMessage id="OrdersDetail.paymentOrder" />
            </Text>
          </Box>
          <Box className={classes.reight}>
            <Text className={classes.title}>{item?.salesman?.name}</Text>
            <Text>{item?.cart?.[0]._id}</Text>
            <Text> {item?.cart?.[0].quantity}</Text>
            <Text> {item?.cart?.[0].price}</Text>
            <Text> {item?.createdAt}</Text>
            <Text>{item?.updatedAt}</Text>
            <Text>{item?.total}</Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default OrdersDetails;

const findItem = (orders: any[], id: string) => {
  return orders.find((item: any) => item._id === id);
};
