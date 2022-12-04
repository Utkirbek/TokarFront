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
import Link from "next/link";
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
      <tr key={prodItem._id}>
        <td>
          <Avatar
            src={prodItem?.product?.image ? `${prodItem?.product?.image}` : ""}
            alt="it's me"
          />
        </td>
        <td>
          <Link href={"/products"}>
            {prodItem?.product === null ? (
              <FormattedMessage id="orders.userNull" />
            ) : (
              prodItem?.product?.title
            )}
          </Link>
        </td>
        <td>
          {prodItem?.product === null ? (
            <FormattedMessage id="orders.userNull" />
          ) : (
            prodItem?.product?.code
          )}
        </td>
        <td>
          {prodItem?.product === null ? (
            <FormattedMessage id="orders.userNull" />
          ) : (
            prodItem?.quantity
          )}
        </td>
        <td>
          {prodItem === null ? (
            <FormattedMessage id="orders.userNull" />
          ) : (
            prodItem?.price
          )}
        </td>
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
            <IconPhoto size={350} />
          )}
        </Box>

        <Box className={classes.left}>
          <Text className={classes.titleHead}>
            <FormattedMessage id="users.userDts.title" />
          </Text>
          <Box className={classes.boxHeader}>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.ordersSalesmen" />
              </Text>
              <Link
                href={`/admins`}
                style={{
                  textDecoration: "none",
                  color: "#1972C2",
                }}>
                <Text className={classes.textStart}>
                  {item?.salesman?.name === null ? (
                    <FormattedMessage id="orders.userNull" />
                  ) : (
                    item?.salesman?.name
                  )}
                </Text>
              </Link>
            </Box>

            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.userExtr" />
              </Text>
              <Text className={classes.textStart}>{item?.user?.extra}</Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="orders.createOrder" />
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
              orderImage: true,
              orderTitleProduct: true,
              ordersProductId: true,
              ordersQuantity: true,
              ordersQuantityAll: true,
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
