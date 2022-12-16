import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import useSpend from "@services/hooks/useSpend";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import SpendDrawer from "./spendDrawer";
import { useSpendStyles } from "./useSpendStyles";

type Props = {
  data?: any;
};

const SpendTable = ({ data }: Props) => {
  const { classes } = useSpendStyles();
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

  const rows = data?.spends?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>{item?.amount}</td>
        <td>{item?.paymentMethod}</td>
        <td>{item?.description}</td>
        <td>{item?.spendType}</td>
        <td>
          <FormattedLocalTime date={item?.createdAt} />
        </td>
        <td>
          <FormattedLocalTime date={item?.updatedAt} />
        </td>
        <td
          style={{
            display: "flex",
            marginTop: "5px",
            justifyContent: "space-around",
          }}
        >
          <ActionIcon>
            <IconTrash
              onClick={() => openDeleteModal(item._id, item.name)}
              style={{ color: "red" }}
            />
          </ActionIcon>
          <ActionIcon>
            <IconPencil onClick={onEditClick.bind(null, item)} />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Box className={classes.spendAdd}>
        <Group position="right" mx={"xl"} my={"xl"}>
          <Button onClick={onClose} variant={"outline"}>
            <FormattedMessage id="expenses.title" />
          </Button>
        </Group>
      </Box>
      <Affix position={{ bottom: 60, right: 20 }}>
        <Box className={classes.spendAddIcon} onClick={onClose}>
          <IconPlus size={25} color={"#fff"} />
        </Box>
      </Affix>
      <ScrollArea>
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
      </ScrollArea>
      <Drawer
        opened={drawerOpen}
        onClose={onClose}
        padding="xl"
        size="xl"
        position="right"
      >
        <SpendDrawer editItem={editItem} handleClose={onClose} />
      </Drawer>
    </>
  );
};

export default SpendTable;
