import If from "@components/smart/If";
import {
  Avatar,
  Button,
  Checkbox,
  Drawer,
  Group,
  Loader,
  ScrollArea,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import Dashboard from "@modules/layout/DashLayout";
import Error from "@modules/products/components/ProductsTable/components/Error";
import useStyles from "@modules/products/components/ProductsTable/ProductTableStyle";
import userFetcher from "@services/api/userFetcher";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import NewUser from "./NewUser/NewUser";

const Users = () => {
  const { mutate: deleteUsers } = useSWRConfig();
  const [editItem, setEditItem] = useState({});
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getUsers, userFetcher.getUsers);

  const handleDelete = async function (id: string) {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Mahsulot o'chirilmoqda",
      message:
        "Bu malumot o'chirilgandn keyin qayta yuklashni iloji yo'q.Yangi mahsulot qo'shasiz",
      autoClose: 2000,
      disallowClose: true,
    });

    const res = await deleteUsers(
      RequestQueryKeys.deleteUsers,
      userFetcher.deleteUsers(id),
      {
        revalidate: true,
      }
    );
    refetch();
    updateNotification({
      id: "load-data",
      color: "teal",
      title: "Oʻchirildi",
      message: "Mahsulot o'chirib tashlandi",
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
  };
  const openDeleteModal = (id: string) =>
    openConfirmModal({
      title: "Mahsulotni o'chirish",
      centered: true,
      children: (
        <Text size="sm">
          Siz bu mahsulotni chindanham o&apos;chirmoqchimisiz
        </Text>
      ),
      labels: { confirm: "O'chirish", cancel: "Orqaga qaytish" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleDelete(id);
      },
      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Hey there, your code is awesome! 🤥",
        });
      },
    });

  const { classes, cx } = useStyles();
  const [selection, setSelection] = useState(["1"]);
  const toggleRow = (id: string) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item: any) => item._id)
    );

  if (error) return <Error />;
  if (!data) return <Loader sx={{ margin: "20%  45%" }} size={"xl"} />;

  const rows = data.map((item: any) => {
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
              onClick={() => openDeleteModal(item._id)}
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
      <Dashboard>
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
          sx={{ height: "120vh" }}>
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
              + Yangi Foydalanuvchi qo&apos;shish
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
                <th>Rasmi</th>
                <th>ISMI</th>
                <th>Raqami</th>
                <th>Ish joyi</th>
                <th>Qoshimcha malumot</th>
                <If hasPerm={Permissions.users.action}>
                  <th> Ochirish / Tahrirlash</th>
                </If>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Dashboard>
    </>
  );
};

export default Users;
