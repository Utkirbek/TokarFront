import If from "@components/smart/If";
import useUser from "@hooks/shared/useUser";
import { Button, Drawer, Group, Table, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import useAdmins from "@services/hooks/useAdmins";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import WithLoading from "@/hoc/WithLoading";
import { Permissions } from "@/utils/constants";

import AdminsDrawer from "./AdminsDrawer";

function TableCard() {
  const { name } = useUser();
  const intl = useIntl();
  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState({});

  const { useFetchAdmins, deleteAdmin } = useAdmins();
  const getAdminsQuery = useFetchAdmins();
  const { data: admins } = getAdminsQuery;

  const handleDelete = async function (id: string) {
    deleteAdmin(id, {
      onSuccess: () => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: intl.formatMessage({ id: "admins.deleteSuccessTitle" }),
          message: intl.formatMessage({ id: "admins.deleteSuccessMessage" }),
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
      onError: () => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: intl.formatMessage({ id: "admins.updateNotifTitle" }),
          message: intl.formatMessage({ id: "admins.updateNotifMessage" }),
          autoClose: false,
          disallowClose: false,
        });
      },
    });
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirmModal({
      title: intl.formatMessage({ id: "admins.deleteModalTitle" }),
      centered: true,
      children: (
        <Text size="sm">
          <FormattedMessage id="admins.deleteConfirmation" values={{ name }} />
        </Text>
      ),
      labels: {
        confirm: intl.formatMessage({ id: "admins.confirm" }),
        cancel: intl.formatMessage({ id: "admins.cancel" }),
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        showNotification({
          id: "load-data",
          loading: true,
          title: intl.formatMessage({ id: "admins.showNotifTitle" }),
          message: intl.formatMessage({ id: "admins.showNotifMessage" }),
          autoClose: false,
          disallowClose: true,
        });
        handleDelete(id);
      },

      onCancel: () => {
        showNotification({
          title: intl.formatMessage({ id: "admins. canselTitle" }),
          message: intl.formatMessage({ id: "admins.cancel" }),
        });
      },
    });
  const onEditClick = (item: any) => {
    setEditItem(item);
    toggleDrawerOpen();
  };

  const onClose = () => {
    toggleDrawerOpen();
    setEditItem({});
  };

  const rows = admins?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>
          <Group spacing="sm">{item.name}</Group>
        </td>

        <td>{item.email}</td>
        <td>{item.role?.name}</td>

        <td>
          {item.name == name ? (
            <IconTrash style={{ color: "red", cursor: "no-drop" }} />
          ) : (
            <If hasPerm={Permissions.admins.delete}>
              <IconTrash
                onClick={() => openDeleteModal(item._id, item.name)}
                style={{ color: "red", cursor: "pointer" }}
              />
            </If>
          )}
          <If hasPerm={Permissions.admins.edit}>
            <IconPencil
              onClick={onEditClick.bind(null, item)}
              style={{
                cursor: "pointer",
                marginLeft: "30px",
              }}
            />
          </If>
        </td>
      </tr>
    );
  });

  return (
    <WithLoading query={getAdminsQuery}>
      <If hasPerm={Permissions.admins.create}>
        <Group position="right" mx={"xl"} my={"xl"}>
          <Button onClick={onClose} variant={"outline"}>
            <FormattedMessage id="admins.addAdmins" />
          </Button>
        </Group>
      </If>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>
              <FormattedMessage id="admins.name" />
            </th>
            <th>
              <FormattedMessage id="admins.email" />
            </th>
            <th>
              <FormattedMessage id="admins.role" />
            </th>
            <th>
              <FormattedMessage id="admins.deletEdit" />
            </th>
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
        <AdminsDrawer editItem={editItem} handleClose={onClose} />
      </Drawer>
    </WithLoading>
  );
}

export default TableCard;
