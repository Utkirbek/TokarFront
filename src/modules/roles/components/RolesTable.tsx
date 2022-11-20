import useUser from "@hooks/shared/useUser";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { Button, Drawer, Group, Table, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { showNotification, updateNotification } from "@mantine/notifications";
import useRoles from "@services/hooks/useRoles";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import WithLoading from "@/hoc/WithLoading";

import RolesDrawer from "./RolesDrawer";

function TableCard() {
  const { name } = useUser();
  const intl = useIntl();
  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState({});

  const { useFetchRoles, deleteRole } = useRoles();
  const getAdminsQuery = useFetchRoles();
  const { data: roles } = getAdminsQuery;
  const { openConfirm } = useConfirmation();
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
        <td>
          <Group spacing="sm">{item.name}</Group>
        </td>
        <td>
          <Group spacing="sm">
            {item.permissions.map((permission: any) => (
              <Text key={permission._id}>
                {intl.formatMessage({ id: `perms.${permission.name}` })}
              </Text>
            ))}
          </Group>
        </td>

        <td>
          {item.name == name ? (
            <IconTrash style={{ color: "red", cursor: "no-drop" }} />
          ) : (
            <IconTrash
              onClick={() => openDeleteModal(item._id, item.name)}
              style={{ color: "red", cursor: "pointer" }}
            />
          )}
          <IconPencil
            onClick={onEditClick.bind(null, item)}
            style={{
              cursor: "pointer",
              marginLeft: "30px",
            }}
          />
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
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="roles.name" />
            </th>
            <th>
              <FormattedMessage id="roles.permission" />
            </th>
            <th>
              <FormattedMessage id="action" />
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <Drawer
        opened={drawerOpen}
        onClose={onClose}
        padding="xl"
        size="30%"
        position="right">
        <RolesDrawer editItem={editItem} handleClose={onClose} />
      </Drawer>
    </>
  );
}

export default TableCard;
