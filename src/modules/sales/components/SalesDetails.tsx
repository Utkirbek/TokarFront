import { selectIsRefund } from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import { Box, Button, Image, Modal, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconPhoto } from "@tabler/icons";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";

import CartStyle from "./CartStyle";

type Props = {
  items?: any;
};

const ProductDetails = ({ items }: Props) => {
  const router = useRouter();
  const isRefund = useSalesState(selectIsRefund);

  const { classes } = CartStyle();
  const isMobile = useMediaQuery("(max-width: 800px)");

  const query = queryString.parse(router.asPath.split("?")[1]);

  const item = items?.find((item: { id?: string; _id: string }) => {
    return isRefund ? item?.id === query.details : item?._id === query.details;
  });

  if (!item) return null;

  return (
    <Modal
      size="2xl"
      fullScreen={isMobile}
      opened={!!item}
      onClose={router.back}
    >
      <Box className={classes.modalHead}>
        <Box className={classes.moadlImage}>
          {!item?.image ? (
            <IconPhoto size={300} />
          ) : (
            <Image radius="md" src={item?.image} alt="Random unsplash image" />
          )}

          <Text fz="lg" fw={500}>
            {item?.title}
          </Text>
        </Box>
        <Box className={classes.modalBtn}>
          <Button onClick={router.back} fullWidth>
            <FormattedMessage id="backTo" />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductDetails;
