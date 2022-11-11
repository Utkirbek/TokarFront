import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import useNotification from "@hooks/useNotification";
import {
  Avatar,
  Button,
  Drawer,
  Grid,
  Group,
  HoverCard,
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
import { IconPencil, IconTrash } from "@tabler/icons";
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

  const {
    showLoadingNotification,
    showReSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const handleDelete = async function (id: string) {
    deleteProducts(id, {
      onSuccess: () => {
        showLoadingNotification();
      },
      onError: () => {
        showErrorNotification();
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
      onConfirm: async () => {
        showLoadingNotification();
        handleDelete(id);
      },
      onCancel: () => {
        showErrorNotification("useNotify.censelMsg", {
          titleId: "useNotify.censelTitle",
        });
      },
    });

  const { data, error } = useSWR(
    RequestQueryKeys.getProducts,
    productFetchers.getProducts
  );

  if (error) return <Error />;
  if (!data) return <Loader sx={{ margin: "20%  45%" }} size={"xl"} />;
  if (data?.length === 0) return <EmptyBox />;

  const rows = products.map((item: any) => {
    const handleEdit = () => {
      setEditItem(item);
      setOpened(true);
    };

    const handleOpenCartBuy = (el: any) => {
      addItem({ id: el._id, ...el });
    };

    return (
      <tr key={item._id}>
        <td>
          <Group spacing="sm">
            <Avatar size={40} src={getCoverImage(item.image)} radius={26} />
            <Group position="center">
              <HoverCard width={280} shadow="md">
                <HoverCard.Target>
                  {item.title.length > 20 ? (
                    <Text size="sm" weight={500}>
                      {item.title.substring(0, 20)}...
                    </Text>
                  ) : (
                    <Text size="sm" weight={500}>
                      {item.title}
                    </Text>
                  )}
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Text size="sm">{item.title}</Text>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
          </Group>
        </td>
        <td>{item.code}</td>
        <If hasPerm={Permissions.accounting.view}>
          <td>
            {item.originalPrice} {item.currency?.name}
          </td>
        </If>
        <td>
          {item.price} {item.currency?.name}
        </td>
        <td>{item.quantity}</td>
        <td style={{ width: 200 }}>
          <If hasPerm={Permissions.products.edit}>
            <IconPencil
              style={{ cursor: "pointer", marginTop: "5px" }}
              onClick={handleEdit}
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
            }}>
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
        position="right">
        <ScrollArea
          style={{ height: "100%", paddingBottom: 60 }}
          scrollbarSize={2}>
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
                    <FormattedMessage id="tableHead.name" />
                  </th>
                  <th>
                    <FormattedMessage id="tableHead.code" />
                  </th>
                  <If hasPerm={Permissions.originalPrice.view}>
                    <th>
                      <FormattedMessage id="tableHead.originalPrice" />
                    </th>
                  </If>
                  <th>
                    <FormattedMessage id="tableHead.price" />
                  </th>
                  <th>
                    <FormattedMessage id="tableHead.quantity" />
                  </th>
                  <th>
                    <FormattedMessage id="tableHead.action" />
                  </th>
                  <th></th>
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
