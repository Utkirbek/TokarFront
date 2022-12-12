import useUser from "@hooks/shared/useUser";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Drawer,
  Grid,
  Group,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import useRoles from "@services/hooks/useRoles";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import RolesDrawer from "./RolesDrawer";
import useRolesStyles from "./rolesStyle";

function TableCard() {
  const { name } = useUser();
  const intl = useIntl();
  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState({});
  const { classes } = useRolesStyles();
  const { useFetchRoles, deleteRole } = useRoles();
  const getAdminsQuery = useFetchRoles();
  const { data: roles } = getAdminsQuery;
  const { openConfirm } = useConfirmation();
  const isIpad = useMediaQuery("(max-width: 1200px)");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const handleDelete = async function (id: string) {
    deleteRole(id, {
      onSuccess: () => {
        showSuccessNotification;
      },
      onError: () => {
        showErrorNotification;
      },
    });
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirm(
      <Text size="sm">
        <FormattedMessage id="roles.deleteConfirmation" values={{ name }} />
      </Text>,
      {
        titleId: intl.formatMessage({ id: "roles.modalTitle" }),
        onConfirm: async () => {
          showLoadingNotification;
          handleDelete(id);
        },

        onCancel: () => {
          showNotification({
            title: intl.formatMessage({ id: "roles.backTitle" }),
            message: intl.formatMessage({ id: "roles.backMsg" }),
          });
        },
      }
    );
  const onEditClick = (item: any) => {
    setEditItem(item);
    toggleDrawerOpen();
  };

  const onClose = () => {
    toggleDrawerOpen();
    setEditItem({});
  };

  const rows = roles?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td style={{ width: "10%" }}>
          <Group spacing="sm">
            <FormattedMessage id={`roles.roles.${item.name}`} />
          </Group>
        </td>
        <td>
          <Group spacing="sm">
            {item.permissions.map((permission: any) => (
              <Text key={permission._id}>
                <FormattedMessage id={`perms.${permission.name}`} />
              </Text>
            ))}
          </Group>
        </td>

        <td className={classes.rolesActionBtn}>
          {item.name == name ? (
            <ActionIcon>
              <IconTrash style={{ color: "red", cursor: "no-drop" }} />
            </ActionIcon>
          ) : (
            <ActionIcon>
              <IconTrash
                onClick={() => openDeleteModal(item._id, item.name)}
                style={{ color: "red" }}
              />
            </ActionIcon>
          )}
          <ActionIcon>
            <IconPencil onClick={onEditClick.bind(null, item)} />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Group position="right" mx={"xl"} my={"xl"}>
        <Button onClick={onClose} variant={"outline"}>
          <FormattedMessage id="roles.addRoles" />
        </Button>
      </Group>
      <Table highlightOnHover className={classes.grid}>
        <thead>
          <tr>
            <th style={{ width: "60px" }}>
              <FormattedMessage id="roles.name" />
            </th>
            <th>
              <FormattedMessage id="roles.permission" />
            </th>
            <th style={{ width: "100px" }}>
              <FormattedMessage id="action" />
            </th>
          </tr>
        </thead>
        <tbody className={classes.grid}>{rows}</tbody>
      </Table>

      <Box className={classes.flex}>
        {roles?.map((item: any) => (
          <Grid key={item._id}>
            <Grid.Col xs={12} sm={5}>
              <Card className={classes.rolesGrid}>
                <Group spacing="sm">
                  <FormattedMessage id={`roles.roles.${item.name}`} />
                </Group>
                {item.name == name ? (
                  <ActionIcon>
                    <IconTrash style={{ color: "red", cursor: "no-drop" }} />
                  </ActionIcon>
                ) : (
                  <ActionIcon>
                    <IconTrash
                      onClick={() => openDeleteModal(item._id, item.name)}
                      style={{ color: "red" }}
                    />
                  </ActionIcon>
                )}
                <ActionIcon>
                  <IconPencil onClick={onEditClick.bind(null, item)} />
                </ActionIcon>
              </Card>
            </Grid.Col>
            <Grid.Col xs={12} sm={7}>
              <Card>
                {item.permissions.map((permission: any) => (
                  <Text key={permission._id}>
                    <FormattedMessage id={`perms.${permission.name}`} />
                  </Text>
                ))}
              </Card>
            </Grid.Col>
          </Grid>
        ))}
      </Box>
      <Box sx={{ height: "100%",  }}>
        <Drawer
          opened={drawerOpen}
          onClose={onClose}
          padding="xl"
          size={isIpad ? ("60%" && isMobile ? "80%" : "60%") : "30%"}
          position="right"
        >
          <ScrollArea
            style={{ height: "100%", paddingBottom: 60 }}
            scrollbarSize={2}
          >
            <RolesDrawer editItem={editItem} handleClose={onClose} />
          </ScrollArea>
        </Drawer>
      </Box>
    </>
  );
}

export default TableCard;
