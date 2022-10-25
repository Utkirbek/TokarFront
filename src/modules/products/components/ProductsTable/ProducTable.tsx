import useUser from "@hooks/shared/useUser";
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
import useStyles from "@modules/products/components/ProductsTable/ProductTableStyle";
import productFetchers from "@services/api/productFetchers";
import useProducts from "@services/hooks/useProducts";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import { useRef,useState  } from "react";
import { useIntl } from "react-intl";
import useSWR from "swr";

import FormProduct from "../form/FormAdd";
import Error from "./components/Error";
import tableHead from "./const/constTableHeadName";

export default function FormMantine() {
  const router = useRouter();
  const intl = useIntl();
  const { name, _id } = useUser();
  const [editItem, setEditItem] = useState({});
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { useFetchProduct, deleteProducts } = useProducts();
  const getAdminsQuery = useFetchProduct();
  const { data: products } = getAdminsQuery;
  const ref = useRef<HTMLInputElement>(null);

  const handleDelete = async function (id: string) {
    deleteProducts(id, {
      onSuccess: () => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Mahsulot o'chirilmoqda",
          message:
            "Bu malumot o'chirilgandn keyin qayta yuklashni iloji yo'q.Yangi mahsulot qo'shasiz",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
      onError: () => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: "Xatolik",
          message: "Xatolik Yoz berdi",
          autoClose: false,
          disallowClose: false,
        });
      },
    });
  };
  const openDeleteModal = (id: string, title: string) =>
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

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getProducts, productFetchers.getProducts);

  if (error) return <Error />;
  if (!data) return <Loader sx={{ margin: "20%  45%" }} size={"xl"} />;

  const rows = products.map((item: any) => {
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
            <Text size="sm" weight={500}>
              {item.title}
            </Text>
          </Group>
        </td>
        <td>{item.code}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        {/* bu yerda chegirma bolyapti */}
        <td>0 %</td>

        <td style={{ display: "flex", alignItems: "center" }}>
          <IconPencil style={{ cursor: "pointer" }} onClick={handEdit} />
          <IconTrash
            color="red"
            style={{ margin: "0  20px", cursor: "pointer" }}
            onClick={() => openDeleteModal(item._id, item.title)}
          />
          <Button>Sotish</Button>
        </td>
        <td>
          <Button
            variant="outline"
            sx={{ width: "100px", height: "30px" }}
            radius={"xl"}>
            Batafsil
          </Button>
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
        sx={{ maxHeight: "150vh" }}
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        position="right">
        <ScrollArea style={{ height: 560 }}>
          <FormProduct
            handleClose={() => {
              setOpened(false);
            }}
            editItem={editItem}
          />
        </ScrollArea>
      </Drawer>

      <Group position="right" mx={"xl"} my={"xl"}>
        <Button onClick={handleClick} variant={"outline"}>
          + Yangi mahsulot qo&apos;shish
        </Button>
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
              <th>{tableHead.name}</th>
              <th>{tableHead.code}</th>
              <th>{tableHead.price}</th>
              <th>{tableHead.quantity}</th>
              <th>{tableHead.discount}</th>
              <th>{tableHead.action}</th>
              <th>{tableHead.details}</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
