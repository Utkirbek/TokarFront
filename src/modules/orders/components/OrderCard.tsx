import If from "@components/smart/If";
import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import { ActionIcon, Box, Button, Grid, SimpleGrid, Text } from "@mantine/core";
import useOrders from "@services/hooks/useOrder";
import { IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { useRouter } from "next/router";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

import useStyles from "./orderStyle";

function OrderCard({
  data,
  openDeleteModal,
}: {
  data: any;
  openDeleteModal: any;
}) {
  const router = useRouter();

  const { classes } = useStyles();

  return (
    <SimpleGrid
      cols={4}
      spacing="md"
      breakpoints={[
        { maxWidth: 980, cols: 4, spacing: "sm" },
        { maxWidth: 780, cols: 3, spacing: "xs" },
        { maxWidth: 540, cols: 2, spacing: "xs" },
      ]}
    >
      {data.map((item: any) => {
        return (
          <Box key={item._id}>
            <Box className={classes.orderCardBox}>
              <Box style={{ paddingTop: "8px" }}>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <TextEllipsis
                    text={item.salesman?.name}
                    maxChars={15}
                    size={14}
                  />
                  <If hasPerm={Permissions.orders.delete}>
                    <div>
                      <ActionIcon>
                        <IconTrash
                          onClick={() => openDeleteModal(item._id, item.name)}
                          className={classes.orderTrash}
                        />
                      </ActionIcon>
                    </div>
                  </If>
                </Box>
                <Text mt={20}>Jami narx {item?.total}</Text>
                <Box
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box></Box>
                  <Button
                    variant="outline"
                    mt={15}
                    onClick={() => {
                      router.push("/orders", {
                        query: {
                          details: item._id,
                        },
                      });
                    }}
                  >
                    <FormattedMessage id="more" />
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

export default OrderCard;
