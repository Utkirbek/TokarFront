import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  Avatar,
  Button,
  Group,
  HoverCard,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import useProducts from "@services/hooks/useProducts";
import { IconPencil, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import { memo, useCallback, useMemo } from "react";
import { FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import { productsTableHead } from "../constants";

type Props = {
  data: unknown[];
  onEdit: (item: unknown) => void;
};

const TableView: React.FC<Props> = ({ data, onEdit }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const { deleteProducts } = useProducts();
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

  const rows = useMemo(
    () =>
      data.map((item: any) => {
        const handleAddToCart = (item: any) => {
          addItem({ id: item._id, ...item });
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
            <If hasPerm={Permissions.products.originalPrice}>
              <td>
                {item.originalPrice} {item.currency?.name}
              </td>
            </If>

            <If hasPerm={Permissions.products.price}>
              <td>
                {item.price.toFixed(2)}_UZS/{item.unit}
              </td>
            </If>

            <td>{item.quantity}</td>
            <td style={{ width: 200 }}>
              <IconPencil
                style={{ cursor: "pointer", marginTop: "5px" }}
                onClick={() => onEdit(item)}
              />

              <If hasPerm={Permissions.products.delete}>
                <IconTrash
                  color="red"
                  style={{ margin: "0  20px", cursor: "pointer" }}
                  onClick={() => openDeleteModal(item._id)}
                />
              </If>
              <If hasPerm={Permissions.products.sell}>
                <Button onClick={() => handleAddToCart(item)}>
                  <FormattedMessage id="products.buy" />
                </Button>
              </If>
            </td>
            <td>
              <Button
                variant="outline"
                style={{
                  marginTop: "5px",
                }}
                onClick={() => showDetails(item._id)}
              >
                <FormattedMessage id="products.details" />
              </Button>
            </td>
          </tr>
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" highlightOnHover>
        <TableHead
          data={productsTableHead}
          prefix="products.table"
          permissionOf="products"
        />
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default memo(TableView);
