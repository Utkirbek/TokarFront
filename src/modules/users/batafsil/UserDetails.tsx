import { Box, Image, Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedDate, FormattedMessage } from "react-intl";

import useStyles from "../../products/components/ProductsTable/ProductTableStyle";

type Props = {
  data?: any;
};

const ProductDetails = ({ data }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(data, query.details as string);

  return (
    <Modal size={"95%"} opened={!!item} onClose={() => router.back()}>
      <Text className={classes.titleHead}>
        {item?.name}
        <FormattedMessage id="users.userDts.title" />
      </Text>
      <Box className={classes.itemGroup}>
        <Box className={classes.imageBox}>
          <Image
            src={
              item?.image
                ? `${item?.image}`
                : "https://www.seekpng.com/png/detail/86-861930_singapore-http-img-placeholder.png"
            }
            alt={"Bu yerda foydalanuvchi rasmi"}
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
              <FormattedMessage id="users.userDts.name" />
            </Text>
            <Text>
              <FormattedMessage id="users.userDts.phone" />
            </Text>
            <Text>
              <FormattedMessage id="users.userDts.origin" />
            </Text>
            <Text>
              <FormattedMessage id="users.userDts.addition" />
            </Text>
            <Text>
              <FormattedMessage id="users.userDts.oldTime" />
            </Text>
            <Text>
              <FormattedMessage id="users.userDts.newTime" />
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

const findItem = (users: any[], id: any) => {
  return users?.find((item: any) => item._id === id);
};
