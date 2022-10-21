import useUser from "@hooks/shared/useUser";
import {
  Avatar,
  Button,
  Checkbox,
  createStyles,
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
import productFetchers from "@services/api/productFetchers";
import { IconCheck, IconEdit, IconTrash } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

import FormProduct from "../form/FormAdd";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function FormMantine() {
  const router = useRouter();
  const { mutate: deleteProduct } = useSWRConfig();
  const { name, _id } = useUser();
  const [editItem, setEditItem] = useState({});
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  // delete modal window start
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

    const res = await deleteProduct(
      RequestQueryKeys.deleteProduct,
      productFetchers.deleteProduct(id),
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

  // delete modal window end

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

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getProducts, productFetchers.getProducts);

  if (error)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "15%",
          flexDirection: "column",
          fontSize: "18px",
          color: "red",
        }}>
        <Text sx={{ fontSize: "40px" }}>Xato !</Text>
        <Text sx={{ fontSize: "18px" }}>
          Malumot Yuklash xatosi! Iltimos internet borligini tekshiring
        </Text>
      </div>
    );
  if (!data)
    return (
      <div>
        <Loader sx={{ margin: "15%  45%" }} size={"xl"} />
      </div>
    );

  const rows = data.map((item: any) => {
    const selected = selection.includes(item._id);

    const handEdit = () => {
      setEditItem(item);
      setOpened(true);
    };

    return (
      <>
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
              <Avatar size={26} src={item.image} radius={26} />
              <Text size="sm" weight={500}>
                {item.title}
              </Text>
            </Group>
          </td>
          <td>{item.code}</td>
          <td>${item.price}</td>
          <td>{item.quantity}</td>
          <td>{item.discount}%</td>
          <td>
            <IconTrash
              color="#e0331f"
              style={{ margin: "0  20px", cursor: "pointer" }}
              onClick={() => openDeleteModal(item._id)}
            />
            <IconEdit style={{ cursor: "pointer" }} onClick={handEdit} />
          </td>
        </tr>
      </>
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
        sx={{ height: "120vh" }}>
        <FormProduct
          handleClose={() => {
            setOpened(false);
          }}
          editItem={editItem}
        />
      </Drawer>

      <Group position="right" mx={"xl"}>
        <Button onClick={handleClick} variant={"outline"} sx={{}}>
          + Yangi mahsulot qo&apos;shish
        </Button>
      </Group>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
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
              <th>Mahsulot Nomi</th>
              <th>Kodi</th>
              <th>Narxi</th>
              <th>Jami</th>
              <th>Chegirma</th>
              <th>O&apos;chirish /Tahrirlash</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
