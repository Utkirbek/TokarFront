import { Box, Image, Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

import useStyles from "../components/styleDetail/styleDetail";

type Props = {
  products: any;
};

const ProductDetails = ({ products }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(products, query.details as string);

  return (
    <Modal size={"95%"} opened={!!item} onClose={() => router.back()}>
      <Text className={classes.titleHead}>
        <FormattedMessage id="products.productDetail.titleHead" />
      </Text>
      <Box className={classes.itemGroup}>
        <Box className={classes.imageBox}>
          <Image
            src={
              item?.image
                ? `${item?.image}`
                : "https://www.seekpng.com/png/detail/86-861930_singapore-http-img-placeholder.png"
            }
            width="500px"
            height="400px"
            sx={{ objectFit: "cover", borderRadius: "20px" }}
            alt={"Bu yerda mahsulot rasmi"}
          />
        </Box>
        <Box className={classes.info}>
          <Box className={classes.left}>
            <Text className={classes.title}>
              <FormattedMessage id="products.productDetail.productName" />
            </Text>
            <Text>
              <FormattedMessage id="products.productDetail.productCode" />
            </Text>
            <Text>
              <FormattedMessage id="products.productDetail.productPrice" />
            </Text>
            <Text>
              <FormattedMessage id="products.productDetail.productTotal" />
            </Text>
            <Text>
              <FormattedMessage id="products.productDetail.createProduct" />
            </Text>
            <Text>
              <FormattedMessage id="products.productDetail.updateProduct" />
            </Text>
          </Box>
          <Box className={classes.reight}>
            <Text className={classes.title}>{item?.title}</Text>
            <Text>{item?.code}</Text>
            <Text> {item?.price}</Text>
            <Text> {item?.quantity}</Text>
            <Text>
              <FormattedTime value={item?.createdAt} />
              ,&nbsp;
              <FormattedDate
                value={item?.createdAt}
                month="numeric"
                year="numeric"
                day="numeric"
              />
            </Text>
            <Text>
              <FormattedTime value={item?.updatedAt} />
              ,&nbsp;
              <FormattedDate
                value={item?.updatedAt}
                month="numeric"
                year="numeric"
                day="numeric"
              />
            </Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetails;

const findItem = (products: any[], id: string) => {
  return products.find((item: any) => item._id === id);
};
