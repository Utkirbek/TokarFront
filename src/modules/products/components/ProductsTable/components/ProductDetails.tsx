import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import { Box, Image, Modal, Table, Text } from "@mantine/core";
import useStyles from "@modules/products/components/ProductsTable/styles";
import { IconPhoto } from "@tabler/icons";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

type Props = {
  products?: any;
};

const ProductDetails = ({ products }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(products, query.details as string);

  return (
    <Modal size={"85%"} opened={!!item} onClose={() => router.back()}>
      <Box className={classes.allDisplay}>
        <Box className={classes.itemGroup}>
          <Box className={classes.imageBox}>
            {item?.image ? (
              <Image
                src={item?.image}
                alt={"Bu yerda foydalanuvchi rasmi"}
                style={{
                  objectFit: "cover",
                }}
                width="100%"
              />
            ) : (
              <IconPhoto size={400} />
            )}
          </Box>

          <Box className={classes.left}>
            <Text className={classes.titleHead}>
              {item?.title === null ? (
                <Text>
                  <FormattedMessage id="loans.foydalanuvchi" />
                </Text>
              ) : (
                item?.title
              )}
            </Text>
            <Box className={classes.boxHeader}>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="products.productDetail.productCode" />
                </Text>
                <Text className={classes.textStart}>{item?.code}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="products.productDetail.productUnit" />
                </Text>
                <Text className={classes.textStart}>{item?.unit}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="products.productDetail.productPrice" />
                </Text>
                <Text className={classes.textStart}>{item?.price}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="products.productDetail.productTotal" />
                </Text>
                <Text className={classes.textStart}>{item?.quantity}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.oldTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedDate
                    value={item?.createdAt}
                    day="2-digit"
                    month="long"
                    year="numeric"
                  />
                  ,&nbsp;
                  <FormattedTime value={item?.createdAt} />
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.newTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedLocalTime date={item?.updatedAt} />
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box p={50}>
          <Text className={classes.discount}>
            <FormattedMessage id="products.discount" />
          </Text>
          <Table style={{ marginTop: 40 }}>
            <TableHead
              data={{
                discountQuantity: true,
                discountPrice: true,
              }}
              prefix={"products.table"}
            />
            <tbody>
              {item?.discounts?.map((el: any) => {
                return (
                  <tr key={item._id}>
                    <td>{el?.quantity}</td>
                    <td>{el?.price}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetails;

const findItem = (products: any[], id: any) => {
  return products?.find((item: any) => item._id === id);
};
