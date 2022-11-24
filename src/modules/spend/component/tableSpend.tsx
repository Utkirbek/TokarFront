import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { Button, Drawer, Group, ScrollArea, Table } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import useSpend from "@services/hooks/useSpend";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

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
        <td>
          <FormattedDate
            value={item?.createdAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
          ,&nbsp;
          <FormattedTime value={item?.createdAt} />
        </td>
        <td>
          <FormattedDate
            value={item?.updatedAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
          ,&nbsp;
          <FormattedTime value={item?.updatedAt} />
        </td>
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
        <TableHead
          data={{
            amount: true,
            paymentMethod: true,
            desc: true,
            spendType: true,
            createdAt: true,
            updatedAt: true,
            delete: true,
          }}
          prefix={"expenses"}
        />
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
