import useUser from "@hooks/shared/useUser";
import { Avatar, Drawer, Group, Table, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import useAdmins from "@services/hooks/useAdmins";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import WithLoading from "@/hoc/WithLoading";

import AdminsDrawer from "./AdminsDrawer";

function TableCard() {
  const { name } = useUser();
  const intl = useIntl();
  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState({});

  const { useFetchAdmins, deleteAdmin, editAdmin } = useAdmins();

  const getAdminsQuery = useFetchAdmins();
  const { data: admins } = getAdminsQuery;

  const handleDelete = async function (id: string) {
    deleteAdmin(id, {
      onSuccess: () => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: intl.formatMessage({ id: "admin.deleteSuccessTitle" }),
          message: "Foydalanuvchi udalit qilindi",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
      onError: () => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Xatolik",
          message: intl.formatMessage({ id: "sthWentWrong" }),
          autoClose: false,
          disallowClose: false,
        });
      },
    });
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirmModal({
      title: "Siz ushbu foydalanuvchini o'chirmoqchimisiz",
      centered: true,
      children: (
        <Text size="sm">
          <FormattedMessage id="admins.deleteConfirmation" values={{ name }} />
        </Text>
      ),
      labels: { confirm: "Tasdiqlash", cancel: "Bekor qilish" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        showNotification({
          id: "load-data",
          loading: true,
          title: "Iltimos kuting",
          message: "Foydalanuvchi udalit qilinyabdi",
          autoClose: false,
          disallowClose: true,
        });
        handleDelete(id);
      },

      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Hey there, your code is awesome! 🤥",
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
          <Group spacing="sm">
            <Avatar size={28} src={item.image} radius={26} />
            {item.name}
          </Group>
        </td>
        <td>{item.email}</td>

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
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Ismi</th>
            <th>Elektron po&lsquo;chta</th>
            <th>o&lsquo;chirish va tahrirlash</th>
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
        <AdminsDrawer
          editItem={editItem}
          handleClose={onClose}
          onEdit={editAdmin}
        />
      </Drawer>
    </WithLoading>
  );
}

export default TableCard;
