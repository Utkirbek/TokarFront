import TableHead from "@components/Table/TableHead";
import {
  Avatar,
  Box,
  Image,
  Modal,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import useStyles from "@modules/products/components/ProductsTable/styles";
import { IconPhoto } from "@tabler/icons";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

type Props = {
  orders?: any;
};

const OrdersDetails = ({ orders }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(orders, query.details as string);

  const rowDetail = item?.cart.map((prodItem: any) => {
    return (
      <tr key={item._id}>
        <td>
          <Avatar
            src={prodItem?.product?.image ? `${prodItem?.product?.image}` : ""}
            alt="it's me"
          />
        </td>
        <td>{prodItem?.product?.title}</td>
        <td>{prodItem?.product?.code}</td>
        <td>{prodItem?.product?.quantity}</td>
        <td>{prodItem?.quantity}</td>
      </tr>
    );
  });

  return (
    <Modal size={"85%"} opened={!!item} onClose={() => router.back()}>
      <Box className={classes.itemGroup}>
        <Box className={classes.imageBox}>
          {item?.image ? (
            <Image
              src={item?.image}
              alt={"Bu yerda foydalanuvchi rasmi"}
              width="100%"
            />
          ) : (
            <IconPhoto size={380} />
          )}
        </Box>

        <Box className={classes.left}>
          <Text className={classes.titleHead}>
            {item?.salesman?.name === null ? (
              <Text>
                <FormattedMessage id="loans.foydalanuvchi" />
              </Text>
            ) : (
              item?.salesman?.name
            )}
            <FormattedMessage id="users.userDts.title" />
          </Text>
          <Box className={classes.boxHeader}>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.ordersSalesmen" />
              </Text>
              <Text className={classes.textStart}>{item?.user?.name}</Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.orderUser" />
              </Text>
              <Text className={classes.textStart}>
                {item?.salesman?.name === null ? (
                  <Text>
                    <FormattedMessage id="loans.foydalanuvchi" />
                  </Text>
                ) : (
                  item?.salesman?.name
                )}
              </Text>
            </Box>

            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.ordersQuantity" />
              </Text>
              <Text className={classes.textStart}>
                {item?.cart?.[0].quantity}
              </Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.ordersQuantity" />
              </Text>
              <Text className={classes.textStart}>{item?.cart?.[0].price}</Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.ordersPrice" />
              </Text>
              <Text className={classes.textStart}>{item?.total}</Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.updateOrder" />
              </Text>
              <Text className={classes.textStart}>
                <FormattedDate
                  value={item?.createdAt}
                  month="numeric"
                  year="numeric"
                  day="numeric"
                />
                ,&nbsp;
                <FormattedTime value={item?.createdAt} />
              </Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.newTime" />
              </Text>
              <Text className={classes.textStart}>
                <FormattedDate
                  value={item?.updatedAt}
                  month="numeric"
                  year="numeric"
                  day="numeric"
                />
                ,&nbsp;
                <FormattedTime value={item?.updatedAt} />
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
      <ScrollArea style={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 700 }} verticalSpacing="sm" highlightOnHover>
          <TableHead
            data={{
              orderTitleProduct: true,
              ordersProductId: true,
              ordersQuantity: true,
              ordersQuantityAll: true,
              ordersPrice: true,
            }}
            prefix="orders"
          />
          <tbody>{rowDetail}</tbody>
        </Table>
      </ScrollArea>
    </Modal>
  );
};

export default OrdersDetails;

const findItem = (orders: any[], id: any) => {
  return orders?.find((item: any) => item._id === id);
};
