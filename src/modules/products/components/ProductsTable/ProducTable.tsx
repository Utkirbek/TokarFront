import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import {
  Avatar,
  Button,
  Checkbox,
  Drawer,
  Grid,
  Group,
  Loader,
  ScrollArea,
  Select,
  Table,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
// import useStyles from "@modules/products/components/details/styleDetail/styleDetail";
import useStyles from "@modules/products/components/ProductsTable/ProductTableStyle";
import productFetchers from "@services/api/productFetchers";
import useProducts from "@services/hooks/useProducts";
import {
  IconCheck,
  IconChevronDown,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";
import useSWR from "swr";

import BuyCart from "../buyCart/BuyCart";
import FormProduct from "../form/FormAdd";
import Error from "./components/Error";
import ProductDetails from "./components/ProductDetails";
import tableHead from "./const/constTableHeadName";

function ProductsTable() {
  const [editItem, setEditItem] = useState({});
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const router = useRouter();
  const { useFetchProduct, deleteProducts } = useProducts();
  const getProductsQuery = useFetchProduct();
  const { data: products } = getProductsQuery;
  const { addItem, isEmpty } = useCart();
  const [info, setInfo] = useState({});

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

  const { data, error } = useSWR(
    RequestQueryKeys.getProducts,
    productFetchers.getProducts
  );

  if (error) return <Error />;
  if (!data) return <Loader sx={{ margin: "20%  45%" }} size={"xl"} />;
  if (data?.length === 0) return <EmptyBox />;

  const rows = products.map((item: any) => {
    const selected = selection.includes(item._id);

    const handEdit = () => {
      setEditItem(item);
      setOpened(true);
    };

    const handleOpenCartBuy = (el: any) => {
      addItem({ id: el._id, ...el });
    };

    const dataDiscount = item.discounts.map((el: any) => {
      return el.price + "/" + el.quantity;
    });

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
        <If hasPerm={Permissions.accounting.view}>
          <td>{item.originalPrice}</td>
        </If>
        <td>{item.price}</td>
        <td>{item.quantity}</td>
        <td>
          <Select
            sx={{ width: "150px" }}
            rightSection={<IconChevronDown size={8} />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: "none" } }}
            data={[`${dataDiscount}`]}
            defaultValue={`${dataDiscount}`}
          />
        </td>

        <td>
          <If hasPerm={Permissions.products.edit}>
            <IconPencil
              style={{ cursor: "pointer", marginTop: "5px" }}
              onClick={handEdit}
            />
          </If>
          <If hasPerm={Permissions.products.delete}>
            <IconTrash
              color="red"
              style={{ margin: "0  20px", cursor: "pointer" }}
              onClick={() => openDeleteModal(item._id, item.title)}
            />
          </If>
          <If hasPerm={Permissions.products.sell}>
            <Button onClick={() => handleOpenCartBuy(item)}>Sotish</Button>
          </If>
        </td>
        <td>
          <Button
            variant="outline"
            sx={{ width: "100px", height: "30px" }}
            radius={"xl"}
            onClick={() => {
              router.push("/products", {
                query: {
                  details: item._id,
                },
              });
            }}
          >
            <FormattedMessage id="products.details" />
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
        position="right"
      >
        <ScrollArea style={{ height: 560 }} scrollbarSize={2}>
          <FormProduct
            handleClose={() => {
              setOpened(false);
            }}
            editItem={editItem}
          />
        </ScrollArea>
      </Drawer>

      <If hasPerm={Permissions.products.create}>
        <Group position="right" mx={"xl"} my={"xl"}>
          <Button onClick={handleClick} variant={"outline"}>
            + Yangi mahsulot qo&apos;shish
          </Button>
        </Group>
      </If>
      <Grid>
        <Grid.Col span={isEmpty ? 12 : 8}>
          <ScrollArea>
            <Table verticalSpacing="sm" highlightOnHover>
              <thead>
                <tr>
                  <th>
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
                  <If hasPerm={Permissions.accounting.view}>
                    <th>{tableHead.price}</th>
                  </If>
                  <th>{tableHead.price}</th>
                  <th>{tableHead.quantity}</th>
                  <th>{tableHead.discount}</th>
                  <th>{tableHead.action}</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Grid.Col>
        {!isEmpty && (
          <Grid.Col span={4}>
            <BuyCart />
          </Grid.Col>
        )}
      </Grid>
      <ProductDetails products={data} />
    </>
  );
}

export default memo(ProductsTable);
