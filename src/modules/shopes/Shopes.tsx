import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Drawer,
  Group,
  ScrollArea,
  Skeleton,
  Text,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import useStyles from "@modules/shopes/styles/shopStyle";
import useShop from "@services/hooks/useShop";
import { IconMapPin, IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import Link from "next/link";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import data from "./components/skalotanData/data";
import EditShop from "./editShop/EditDrawer";

export const Loader = () => {
  const { classes } = useStyles();
  return (
    <Box my={10} className={classes.Skeleton}>
      {data.map((item) => {
        return (
          <Box key={item.id}>
            <Skeleton height="300px" width={"300px"} mx={20} />
          </Box>
        );
      })}
    </Box>
  );
};

const Shopes = () => {
  const { classes } = useStyles();
  const { deleteShop } = useShop();
  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState({});

  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();

  const { useFetchShop } = useShop();
  const getShopQuery = useFetchShop();
  const { data: shops } = getShopQuery;

  const openDeleteModal = (id: string) => {
    openConfirm(null, {
      onConfirm: () => {
        showLoadingNotification();
        deleteShop(id, {
          onSuccess: () => showSuccessNotification(),
          onError: () => showErrorNotification(),
        });
      },
    });
  };

  const onClose = () => {
    toggleDrawerOpen();
  };
  const onEditClick = (item: string) => {
    toggleDrawerOpen();
    setEditItem(item);
  };

  return (
    <>
      <WithLoading query={getShopQuery} FallbackLoadingUI={Loader}>
        <Box className={classes.box}>
          <Box>
            <If hasPerm={Permissions.shop.create}>
              <Link href={"/newShop"}>
                <Box className={classes.Cart}>
                  <IconPlus className={classes.plusIcon} />
                </Box>
              </Link>
            </If>
          </Box>

          {shops?.map((item: any, idx: any) => {
            return (
              <Box className={classes.Cart} key={idx}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Group position="right">
                    <Button radius="md" m={10} className={classes.more}>
                      <FormattedMessage id="shopes.more" />
                    </Button>
                  </Group>
                  <Group position="left">
                    <ActionIcon>
                      <IconPencil onClick={() => onEditClick(item)} />
                    </ActionIcon>
                    <ActionIcon>
                      <IconTrash
                        color="red"
                        onClick={() => openDeleteModal(item._id)}
                      />
                    </ActionIcon>
                  </Group>
                </Box>

                <Box className={classes.miniCArt}>
                  <Group position="center" className={classes.col}>
                    <Text weight={500} size={23}>
                      {item.name}
                    </Text>
                    <Group>
                      <IconMapPin />
                      <Text weight={500} size={15}>
                        {item.location}
                      </Text>
                    </Group>

                    <Button variant="gradient" fullWidth mt="xs" radius="md">
                      <FormattedMessage id="shopes.enter" />
                    </Button>
                  </Group>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Drawer
          opened={drawerOpen}
          onClose={onClose}
          padding="xl"
          size="xl"
          position="right"
        >
          <EditShop editItem={editItem} onClose={onClose} />
        </Drawer>
      </WithLoading>
    </>
  );
};
export default Shopes;
