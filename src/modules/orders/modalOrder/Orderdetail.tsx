import TableHead from "@components/Table/TableHead";
import { Box, Modal, ScrollArea, Table, Text } from "@mantine/core";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";

import useStyles from "./orderStyle";

type Props = {
  orders: any;
};

const OrdersDetails = ({ orders }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(orders, query.details as string);

  const rowDetail = item?.cart.map((prodItem: any) => {
    return (
      <tr key={item._id}>
        <td>{prodItem?.product?.image}</td>
        <td>{prodItem?.product?.title}</td>
        <td>{prodItem?.product?.code}</td>
        <td>{prodItem?.product?.quantity}</td>
        <td>{prodItem?.quantity}</td>
        <td>{prodItem?.price}</td>
        <td>{prodItem?.product?.description}</td>
      </tr>
    );
  });
  return (
    <Modal size={"95%"} opened={!!item} onClose={() => router.back()}>
      <Text className={classes.titleHead}>
        <FormattedMessage id="orders.titleHead" />
      </Text>
      <Box className={classes.itemGroup}>
        <Box className={classes.imageBox}>
          <Text className={classes.title}>
            <FormattedMessage id="orders.orderUser" />
          </Text>
          <Text className={classes.right}>{item?.user?.name}</Text>
        </Box>

        <Box className={classes.info}>
          <Box className={classes.left}>
            <Text className={classes.title}>
              <FormattedMessage id="orders.ordersSalesmen" />
            </Text>
            <Text>
              <FormattedMessage id="orders.ordersProductId" />
            </Text>
            <Text>
              <FormattedMessage id="orders.ordersQuantity" />
            </Text>
            <Text>
              <FormattedMessage id="orders.ordersPrice" />
            </Text>
            <Text>
              <FormattedMessage id="orders.createOrder" />
            </Text>
            <Text>
              <FormattedMessage id="orders.updateOrder" />
            </Text>
            <Text>
              <FormattedMessage id="orders.paymentOrder" />
            </Text>
          </Box>
          <Box className={classes.right}>
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
      <ScrollArea>
        <Table sx={{ minWidth: 700 }} verticalSpacing="sm" highlightOnHover>
          <TableHead
            data={{
              orderImage: true,
              orderTitleProduct: true,
              ordersProductId: true,
              ordersQuantity: true,
              ordersQuantityAll: true,
              ordersPrice: true,
              userExtra: true,
            }}
            prefix="OrdersDetail"
          />
          <tbody>{rowDetail}</tbody>
        </Table>
      </ScrollArea>
    </Modal>
  );
};

export default OrdersDetails;

const findItem = (orders: any[], id: string) => {
  return orders.find((item: any) => item._id === id);
};
