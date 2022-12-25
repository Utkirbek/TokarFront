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
  return (
    <Box
      my={10}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}>
      {data.map((item) => {
        return (
          <Box key={item.id}>
            <Skeleton height="350px" width={"300px"} mx={20} />
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
        <ScrollArea style={{ width: "100%", height: "100vh" }}>
          <Box className={classes.box}>
            <If hasPerm={Permissions.shop.create}>
              <Link href={"/newShop"}>
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  className={classes.Cart}>
                  <IconPlus className={classes.plusIcon} />
                </Card>
              </Link>
            </If>

            {shops?.map((item: any, idx: any) => {
              return (
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  className={classes.Cart}
                  key={idx}>
                  <Card.Section
                    sx={{
                      width: "350px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Group position="right">
                      <Button radius="md" m={10} className={classes.more}>
                        <FormattedMessage id="shopes.more" />
                      </Button>
                    </Group>
                    <Group position="left" mx={20}>
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
                  </Card.Section>

                  <Card className={classes.miniCArt} radius="md">
                    <Group position="center" className={classes.col}>
                      <Group>
                        <Text weight={500} size={25}>
                          {item.name}
                        </Text>
                      </Group>
                      <Group>
                        <IconMapPin />
                        <Text weight={500} size={15}>
                          {item.location}
                        </Text>
                      </Group>

                      <Button variant="gradient" fullWidth mt="md" radius="md">
                        <FormattedMessage id="shopes.enter" />
                      </Button>
                    </Group>
                  </Card>
                </Card>
              );
            })}
          </Box>
        </ScrollArea>
        <Drawer
          opened={drawerOpen}
          onClose={onClose}
          padding="xl"
          size="30%"
          position="right">
          <EditShop editItem={editItem} onClose={onClose} />
        </Drawer>
      </WithLoading>
    </>
  );
};
export default Shopes;
