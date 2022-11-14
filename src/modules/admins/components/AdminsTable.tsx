import If from "@components/smart/If";
import useUser from "@hooks/shared/useUser";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { Button, Drawer, Group, Table, Text } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import useAdmins from "@services/hooks/useAdmins";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Permissions } from "@/utils/constants";

import AdminsDrawer from "./AdminsDrawer";
import Salary from "./Salary";

function TableCard({ data }: { data: any }) {
  const { name } = useUser();
  const intl = useIntl();
  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState({});

  const { useFetchAdmins, deleteAdmin } = useAdmins();
  const getAdminsQuery = useFetchAdmins();
  const { data: admins } = getAdminsQuery;
  const {
    showSuccessNotification,
    showErrorNotification,
    showLoadingNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();

  const handleDelete = async function (id: string) {
    deleteAdmin(id, {
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
        <FormattedMessage
          id="admins.delete.modal.confirmation"
          values={{ name }}
        />
      </Text>,
      {
        titleId: intl.formatMessage({ id: "admins.delete.modal.title" }),
        onConfirm: async () => {
          showLoadingNotification;
          handleDelete(id);
        },

        onCancel: () => {
          showNotification({
            title: "Siz bekor qildingiz",
            message: "Siz Admini o'chirmadiz 🤥",
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

  const rows = data?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>
          <Group spacing="sm">{item.name}</Group>
        </td>
        <td>{item.email}</td>
        <td>{item.role?.name}</td>
        <td>{item.salary_percent}%</td>
        <td>{item.earned_salary}</td>
        <td>
          <Group>
            <Salary inpStaff={item._id} />
          </Group>
        </td>

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
    <>
      <If hasPerm={Permissions.admins.create}>
        <Group position="right" mx={"xl"} my={"xl"}>
          <Button onClick={onClose} variant={"outline"}>
            <FormattedMessage id="admins.add.title" />
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
              <FormattedMessage id="admins.salary_percent" />
            </th>
            <th>
              <FormattedMessage id="admins.earned_salary" />
            </th>
            <th>
              <FormattedMessage id="admins.give_salary" />
            </th>
            <th>
              <FormattedMessage id="admins.deleteEdit" />
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
    </>
  );
}

export default TableCard;
