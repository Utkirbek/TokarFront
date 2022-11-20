import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import FormDrawer from "@components/Drawer/FormDrawer";
import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  HoverCard,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { productsTableHead } from "@modules/products/constants";
import productFetchers from "@services/api/productFetchers";
import useProducts from "@services/hooks/useProducts";
import { IconPencil, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import { memo, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import BuyCart from "../buyCart/BuyCart";
import FormProduct from "../form/FormAdd";
import ProductDetails from "./components/ProductDetails";

function ProductsTable({ data }: any) {
  const [editItem, setEditItem] = useState({});
  const [opened, toggleOpened] = useToggle();
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();
  const { deleteProducts } = useProducts();
  const { addItem, isEmpty } = useCart();
  const { openConfirm } = useConfirmation();

  const {
    showLoadingNotification,
    showErrorNotification,
    showSuccessNotification,
  } = useNotification();

  const handleDelete = async function (id: string) {
    showLoadingNotification();
    deleteProducts(id, {
      onSuccess: () => showSuccessNotification(),
      onError: () => showErrorNotification(),
    });
  };

  const openDeleteModal = (id: string, title: string) => {
    openConfirm(null, {
      onConfirm: () => handleDelete(id),
    });
  };

  if (data?.length === 0) return <EmptyBox />;

  const rows = (searchResults.length > 0 ? searchResults : data).map(
    (item: any) => {
      const handleEdit = () => {
        setEditItem(item);
        toggleOpened();
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
          <td>{item.price}_UZS</td>
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
              <Button onClick={() => handleOpenCartBuy(item)}>
                <FormattedMessage id="products.buy" />
              </Button>
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
    }
  );

  const handleClick = () => {
    toggleOpened();
    setEditItem({});
  };

  return (
    <>
      <FormDrawer {...{ opened, toggleOpened }}>
        <ScrollArea
          style={{ height: "100%", paddingBottom: 60 }}
          scrollbarSize={2}>
          <FormProduct
            handleClose={() => toggleOpened(false)}
            editItem={editItem}
          />
        </ScrollArea>
      </FormDrawer>

      <If hasPerm={Permissions.products.create}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <SearchAutoComplete
            searchResults={searchResults}
            setSearchResults={setSearchResults}
            fetcher={productFetchers.getProductByTitle}
          />
          <Button onClick={handleClick} variant={"outline"}>
            <FormattedMessage id="products.add" />
          </Button>
        </Box>
      </If>
      <Grid>
        <Grid.Col span={isEmpty ? 12 : 8}>
          <ScrollArea>
            <Table verticalSpacing="sm" highlightOnHover>
              <TableHead data={productsTableHead} prefix="products.table" />
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        </Grid.Col>
        <If condition={!isEmpty}>
          <Grid.Col span={4}>
            <BuyCart />
          </Grid.Col>
        </If>
      </Grid>
      <ProductDetails products={data} />
    </>
  );
}

export default memo(ProductsTable);
