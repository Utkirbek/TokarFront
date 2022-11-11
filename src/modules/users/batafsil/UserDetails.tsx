import { Box, Image, Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedDate, FormattedMessage } from "react-intl";

import useStyles from "../../products/components/ProductsTable/ProductTableStyle";

type Props = {
  user: any;
};

const ProductDetails = ({ user }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(user, query.details as string);

  return (
    <Modal size={"95%"} opened={!!item} onClose={() => router.back()}>
      <Text className={classes.titleHead}>
        {item?.name}
        <FormattedMessage id="productDetails.title" />
      </Text>
      <Box className={classes.itemGroup}>
        <Box className={classes.imageBox}>
          <Image
            src={item?.image}
            alt={"Bu yerda Mahsulot rasmi bolishi kerak"}
            style={{
              objectFit: "cover",
              borderRadius: "15px",
            }}
            width="100%"
            height={400}
            radius="md"
          />
        </Box>

        <Box className={classes.info}>
          <Box className={classes.left}>
            <Text className={classes.title}></Text>
            <Text>
              <FormattedMessage id="productDetails.name" />
            </Text>
            <Text>
              <FormattedMessage id="productDetails.dokon" />
            </Text>
            <Text>
              <FormattedMessage id="productDetails.telNomer" />
            </Text>
            <Text>
              <FormattedMessage id="productDetails.manzil" />
            </Text>
            <Text>
              <FormattedMessage id="productDetails.eskiVaqt" />
            </Text>
            <Text>
              <FormattedMessage id="productDetails.yangiVaqt" />
            </Text>
          </Box>
          <Box className={classes.reight}>
            <Text className={classes.title}>{item?.title}</Text>
            <Text>{item?.name}</Text>
            <Text> {item?.extra}</Text>
            <Text
              style={{
                cursor: "pointer",
              }}
            >
              {item?.phone}
            </Text>
            <Text>{item?.workplace}</Text>
            <Text>
              <FormattedDate value={item?.createdAt} />
            </Text>
            <Text>
              <FormattedDate value={item?.updatedAt} />
            </Text>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetails;

const findItem = (user: any[], id: any) => {
  return user.find((item: any) => item._id === id);
};
