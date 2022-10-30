import useUser from "@hooks/shared/useUser";
import { Button, Drawer, Group, Table, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
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

  const handleDelete = async function (id: string) {
    deleteRole(id, {
      onSuccess: () => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: intl.formatMessage({ id: "role.deleteSuccessTitle" }),
          message: intl.formatMessage({ id: "role.deleteSuccessMessage" }),
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
      onError: () => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Muvaffaqiyatli o'chirildi",
          message: "O'chirishda xatolik ro'y berdi",
          autoClose: false,
          disallowClose: false,
        });
      },
    });
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirmModal({
      title: "Siz ushbu Rolni o'chirmoqchimisiz",
      centered: true,
      children: (
        <Text size="sm">
          <FormattedMessage id="admins.deleteConfirmation" values={{ name }} />
        </Text>
      ),
      labels: {
        confirm: "Tasdiqlash",
        cancel: "Bekor qilish",
      },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        showNotification({
          id: "load-data",
          loading: true,
          title: "Iltimos kuting",
          message: "Rol udalit qilinyabdi",
          autoClose: false,
          disallowClose: true,
        });
        handleDelete(id);
      },

      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Siz Rolni o'chirmadiz 🤥",
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

  const rows = roles?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>
          <Group spacing="sm">{item.name}</Group>
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
    <WithLoading query={getAdminsQuery}>
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
              <FormattedMessage id="roles.deletEdit" />
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
        position="right"
      >
        <RolesDrawer editItem={editItem} handleClose={onClose} />
      </Drawer>
    </WithLoading>
  );
}

export default TableCard;
