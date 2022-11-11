import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { Button, Drawer, Group, ScrollArea, Table } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import useSpend from "@services/hooks/useSpend";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import { nameTable } from "../const/tableconst";
import SpendDrawer from "./spendDrawer";

type Props = {
  data?: any;
};

const SpendTable = ({ data }: Props) => {
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();

  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState({});
  const { deleteSpend } = useSpend();

  const handleDelete = async function (id: string) {
    deleteSpend(id, {
      onSuccess: () => {
        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    });
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirm(null, {
      onConfirm: async () => {
        showLoadingNotification();
        handleDelete(id);
      },
      onCancel: () => {
        showSuccessNotification();
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
  const rows = data.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>{item?.amount}</td>
        <td>{item?.paymentMethod}</td>
        <td>{item?.description}</td>
        <td>{item?.spendType}</td>
        <td>{item?.createdAt}</td>
        <td>{item?.updatedAt}</td>
        <td>
          <IconTrash
            onClick={() => openDeleteModal(item._id, item.name)}
            style={{ color: "red", cursor: "pointer" }}
          />
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
    <ScrollArea>
      <Group position="right" mx={"xl"} my={"xl"}>
        <Button onClick={onClose} variant={"outline"}>
          <FormattedMessage id="expenses.title" />
        </Button>
      </Group>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th>{nameTable?.amount}</th>
            <th>{nameTable?.paymentMethod}</th>
            <th>{nameTable?.desc}</th>
            <th>{nameTable?.spendType}</th>
            <th>{nameTable?.createdAt}</th>
            <th>{nameTable?.updatedAt}</th>
            <th>{nameTable?.delete}</th>
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
        <SpendDrawer editItem={editItem} handleClose={onClose} />
      </Drawer>
    </ScrollArea>
  );
};

export default SpendTable;
