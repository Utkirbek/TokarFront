import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  Avatar,
  Button,
  Checkbox,
  Drawer,
  Group,
  ScrollArea,
  Table,
  useMantineTheme,
} from "@mantine/core";
import useStyles from "@modules/products/components/ProductsTable/styles/ProductTableStyle";
import useUsers from "@services/hooks/useUser";
import { IconPencil, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import NewUser from "../NewUser";

type Props = {
  data?: any;
};
const TableUser = ({ data }: Props) => {
  const intl = useIntl();
  const [editItem, setEditItem] = useState({});
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();
  const { deleteUsers } = useUsers();

  const handleDelete = async function (id: string) {
    deleteUsers(id, {
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

  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(["1"]);

  const toggleRow = useCallback(
    (id: string) =>
      setSelection((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id]
      ),
    []
  );

  const toggleAll = useCallback(
    () =>
      setSelection((current) =>
        current.length === data.length ? [] : data.map((item: any) => item._id)
      ),
    [data]
  );

  if (data?.length === 0) return <EmptyBox />;

  const rows = data?.map((item: any) => {
    const selected = selection.includes(item._id);

    const handEdit = () => {
      setEditItem(item);
      setOpened(true);
    };

    return (
      <tr key={item._id} className={cx({ [classes.rowSelected]: selected })}>
        <td>
          <Checkbox
            checked={selection.includes(item._id)}
            onChange={() => toggleRow(item._id)}
            transitionDuration={0}
          />
        </td>
        <td>
          <Group spacing="sm">
            <Avatar size={40} src={getCoverImage(item.image)} radius={26} />
          </Group>
        </td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.workplace}</td>
        <td>{item.extra}</td>
        <td>
          <If hasPerm={Permissions.users.delete}>
            <IconTrash
              color="red"
              style={{ margin: "0  20px", cursor: "pointer" }}
              onClick={() => openDeleteModal(item._id, item.name)}
            />
          </If>
          <If hasPerm={Permissions.users.edit}>
            <IconPencil style={{ cursor: "pointer" }} onClick={handEdit} />
          </If>
        </td>
      </tr>
    );
  });

  const handleClick = () => {
    setOpened(true);
    setEditItem({});
  };

  return (
    <>
      <Drawer
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        position="right"
        sx={{ height: "120vh" }}
      >
        <NewUser
          handleClose={() => {
            setOpened(false);
          }}
          editItem={editItem}
        />
      </Drawer>
      <Group position="right" mx={"xl"}>
        <If hasPerm={Permissions.users.create}>
          <Button onClick={handleClick} variant={"outline"}>
            <FormattedMessage id="userTil.AddUser" />
          </Button>
        </If>
      </Group>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
          <thead>
            <tr>
              <th style={{ width: 40 }}>
                <Checkbox
                  onChange={toggleAll}
                  checked={selection.length === data.length}
                  indeterminate={
                    selection.length > 0 && selection.length !== data.length
                  }
                  transitionDuration={0}
                />
              </th>
              <th>
                <FormattedMessage id="userTil.image" />
              </th>
              <th>
                <FormattedMessage id="userTil.name" />
              </th>
              <th>
                <FormattedMessage id="userTil.number" />
              </th>
              <th>
                <FormattedMessage id="userTil.workplace" />
              </th>
              <th>
                <FormattedMessage id="userTil.extra" />
              </th>
              <If hasPerm={Permissions.users.action}>
                <th>
                  <FormattedMessage id="userTil.deleteOrEdit" />
                </th>
              </If>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default TableUser;
