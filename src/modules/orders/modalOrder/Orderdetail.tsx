import TableHead from "@components/Table/TableHead";
import { Box, Modal, ScrollArea, Table, Text } from "@mantine/core";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";

// eslint-disable-next-line import/no-duplicates
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
        <FormattedMessage id="OrdersDetail.titleHead" />
      </Text>
      <Box className={classes.itemGroup}>
        <Box className={classes.boxColumn}>
          <Box className={classes.info}>
            <Box className={classes.left}>
              <Text className={classes.title}>
                <FormattedMessage id="OrdersDetail.orderUser" />
              </Text>
              <Text>
                <FormattedMessage id="OrdersDetail.userPhoneNumber" />
              </Text>
              <Text>
                <FormattedMessage id="OrdersDetail.userWorkplace" />
              </Text>
              <Text>
                <FormattedMessage id="OrdersDetail.userExtra" />
              </Text>
              <Text>
                <FormattedMessage id="OrdersDetail.createOrder" />
              </Text>
              <Text>
                <FormattedMessage id="OrdersDetail.updateOrder" />
              </Text>
            </Box>
            <Box className={classes.right}>
              <Text className={classes.title}>{item?.user?.name}</Text>
              <Text> {item?.user?.phone}</Text>
              <Text> {item?.user?.workplace}</Text>
              <Text> {item?.user?.extra}</Text>
              <Text> {item?.user?.createdAt}</Text>
              <Text>{item?.user?.updatedAt}</Text>
            </Box>
          </Box>
        </Box>

        <Box className={classes.boxColumn}>
          <Box className={classes.info}>
            <Box className={classes.left}>
              <Text className={classes.title}>
                <FormattedMessage id="OrdersDetail.ordersSalesmen" />
              </Text>
              <Text>
                <FormattedMessage id="OrdersDetail.createOrder" />
              </Text>
              <Text>
                <FormattedMessage id="OrdersDetail.updateOrder" />
              </Text>
            </Box>
            <Box className={classes.right}>
              <Text>{item?.salesman}</Text>
              <Text> {item?.createdAt}</Text>
              <Text>{item?.updatedAt}</Text>
            </Box>
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
