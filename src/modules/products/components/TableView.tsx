import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Group,
  HoverCard,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import useProducts from "@services/hooks/useProducts";
import { IconPencil, IconTrash } from "@tabler/icons";
import { floorLastThreeDigits, getNumber } from "@utils";
import { Permissions } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Barcode from "react-barcode";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { useReactToPrint } from "react-to-print";
import { useCart } from "react-use-cart";

import { productsTableHead } from "../constants";
import useTableStyles from "./ProductsTable/styles/TableStyles";

type Props = {
  data: unknown[];
  onEdit: (item: unknown) => void;
  minStock: boolean;
};

const TableView: React.FC<Props> = ({ data, onEdit, minStock }) => {
  const router = useRouter();
  const barcodeRef = useRef(null);
  const [activeBarcode, setActiveBarcode] = useState();
  const { addItem, inCart, updateItemQuantity, getItem, items } = useCart();
  const { deleteProducts } = useProducts();
  const { openConfirm } = useConfirmation();
  const { cx, classes } = useTableStyles();

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

  const openDeleteModal = useCallback((id: string) => {
    openConfirm(null, {
      onConfirm: () => handleDelete(id),
    });
  }, []);

  const showDetails = useCallback((id: string) => {
    router.push("/products", {
      query: {
        details: id,
      },
    });
  }, []);

  const handleAddToCart = (item: any) => {
    if (inCart(item._id)) {
      const cartItem = getItem(item._id);
      updateItemQuantity(cartItem._id, cartItem?.quantity + 1);
    } else {
      addItem({
        ...item,
        id: item._id,
        price: getNumber(item.calculatedPrice),
      });
    }
  };

  const handlePrintBarCode = useReactToPrint({
    content: () => barcodeRef.current,
  });

  useEffect(() => {
    if (activeBarcode) {
      handlePrintBarCode();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBarcode]);

  const rows = useMemo(
    () =>
      data.map((item: any) => {
        const handleAddToCart = (item: any) => {
          addItem({
            id: item._id,
            ...item,
            price: getNumber(item.calculatedPrice),
          });
        };

        return (
          <tr
            key={item._id}
            className={cx({
              [classes.minStock]: item.quantity <= item.minQuantity || minStock,
              [classes.noPriceWarning]: !item.price || !item.originalPrice,
            })}
          >
            <td>
              <Group spacing="sm">
                <Avatar
                  size={40}
                  src={getCoverImage(item.image)}
                  radius={26}
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setActiveBarcode(item.code);
                  }}
                />
                <HoverCard shadow="md">
                  <HoverCard.Target>
                    <Text size="sm" weight={500}>
                      <TextEllipsis text={item.title} maxChars={20} />
                    </Text>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">{item.title}</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Group>
            </td>
            <td>{item.code}</td>
            <If hasPerm={Permissions.products.originalPrice}>
              <td>
                <FormattedNumber
                  value={item.originalPrice}
                  style="currency"
                  currency={item.currency?.name}
                  maximumFractionDigits={1}
                />
              </td>
            </If>

            <If hasPerm={Permissions.products.price}>
              <td>
                <FormattedNumber
                  value={getNumber(item.calculatedPrice)}
                  style="currency"
                  currency="UZS"
                  maximumFractionDigits={1}
                />
                /{item.unit}
              </td>
            </If>

            <td>{item.quantity}</td>
            <td>
              <Group spacing="sm">
                <ActionIcon>
                  <IconPencil
                    style={{ cursor: "pointer", marginTop: "5px" }}
                    onClick={() => onEdit(item)}
                  />
                </ActionIcon>

                <If hasPerm={Permissions.products.delete}>
                  <ActionIcon>
                    <IconTrash
                      color="red"
                      onClick={() => openDeleteModal(item._id)}
                    />
                  </ActionIcon>
                </If>
                <If hasPerm={Permissions.products.sell}>
                  <Button onClick={() => handleAddToCart(item)}>
                    <FormattedMessage id="products.buy" />
                  </Button>
                </If>
              </Group>
            </td>

            <td>
              <Button variant="outline" onClick={() => showDetails(item._id)}>
                <FormattedMessage id="products.details" />
              </Button>
            </td>
          </tr>
        );
      }),
    [data, minStock, onEdit, handleAddToCart]
  );

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <TableHead
          data={productsTableHead}
          prefix="products.table"
          permissionOf="products"
        />
        <tbody>{rows}</tbody>
      </Table>
      <Box style={{ display: "none" }}>
        <Box ref={barcodeRef}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: "30px",
              marginTop: "10px",
            }}
          >
            <Barcode
              // @ts-ignore
              value={activeBarcode}
              height={80}
              width={2.6}
              textAlign={"center"}
            />
          </Box>
        </Box>
      </Box>
    </ScrollArea>
  );
};

export default TableView;
