import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import { selectDiscountMode, selectIsRefund } from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import {
  ActionIcon,
  Avatar,
  Chip,
  Group,
  NumberInput,
  Table,
} from "@mantine/core";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { floorLastThreeDigits, getNumber, replaceThreeNumbWithK } from "@utils";
import { useRouter } from "next/router";
import React from "react";
import { useCart } from "react-use-cart";

import SalesDetails from "./SalesDetails";

const ths = {
  no: true,
  code: true,
  name: true,
  price: true,
  quantity: true,
  sum: true,
  actions: true,
};

interface CartTableProps {}

const CartTable: React.FC<CartTableProps> = ({}) => {
  const { items, updateItem, updateItemQuantity, removeItem } = useCart();
  const router = useRouter();
  const isRefund = useSalesState(selectIsRefund);
  const discountMode = useSalesState(selectDiscountMode);

  const updateDiscount = (item: any, quantity: number) => {
    if (discountMode) {
      const discountedPrice = getClosestDiscount(
        item.discounts,
        quantity
      )?.price;
      if (discountedPrice) {
        updateItem(item.id, { price: discountedPrice });
      } else {
        updateItem(item.id, {
          price: getNumber(item.calculatedPrice),
        });
      }
    }
  };

  const rows = items.map((item, index) => {
    const val = getClosestDiscount(item.discounts, item.quantity!)?.price;

    return (
      <tr key={item._id}>
        <td>{index}</td>
        <td>{item.code}</td>
        <td>
          <Group spacing="sm">
            <Avatar
              size={40}
              radius={40}
              src={item.image}
              style={{ cursor: "pointer" }}
              onClick={() => {
                router.push(router.pathname, {
                  query: {
                    details: isRefund ? item.id : item._id,
                  },
                });
              }}
            />
            <div>
              <TextEllipsis text={item.title} maxChars={40} />
            </div>
          </Group>
        </td>
        <td>
          <NumberInput
            hideControls
            min={0}
            precision={1}
            disabled={isRefund}
            sx={{
              width: `${
                floorLastThreeDigits(item.price).toString?.()?.length + 5
              }ch`,
            }}
            value={item.price}
            onChange={(val) => {
              if (val) {
                updateItem(item.id, { price: +val });
              }
            }}
          />
        </td>
        <td>
          <Group>
            <ActionIcon
              color="red"
              onClick={() => {
                updateItemQuantity(item.id, item.quantity! - 1);
                updateDiscount(item, item.quantity! - 1);
              }}
              disabled={item.quantity! <= 0}
            >
              <IconMinus />
            </ActionIcon>
            <NumberInput
              precision={1}
              hideControls
              value={item.quantity}
              size="xs"
              min={0}
              max={item.maxQuantity}
              sx={{
                width: `${
                  item.quantity && item.quantity.toString?.()?.length + 4
                }ch`,
              }}
              onChange={(val) => {
                if (val && val <= item.maxQuantity) {
                  updateItemQuantity(item.id, Number(val));
                  updateDiscount(item, Number(val));
                }
              }}
            />
            <small>{item.unit}</small>

            <ActionIcon
              color={"green"}
              onClick={() => {
                updateItemQuantity(item.id, item.quantity! + 1);
                updateDiscount(item, item.quantity! + 1);
              }}
              disabled={isRefund || item.quantity! >= item.maxQuantity}
            >
              <IconPlus />
            </ActionIcon>
          </Group>
        </td>
        <If condition={discountMode}>
          <td>
            {item.discounts?.length > 0 && (
              <Chip.Group value={val}>
                {item.discounts?.map(
                  (discount: {
                    quantity: number;
                    price: number;
                    _id: string;
                  }) => (
                    <Chip
                      disabled={discount.price !== val}
                      size="xs"
                      key={discount._id}
                      color={"green"}
                      variant="filled"
                      value={discount.price}
                    >
                      {`${discount.quantity}x ${replaceThreeNumbWithK(
                        discount.price
                      )} `}
                    </Chip>
                  )
                )}
              </Chip.Group>
            )}
          </td>
        </If>
        <td>
          <NumberInput
            precision={1}
            hideControls
            value={floorLastThreeDigits(item.itemTotal!)}
            disabled={isRefund}
            sx={{
              width: `${
                item.itemTotal &&
                floorLastThreeDigits(item.itemTotal).toString?.()?.length + 5
              }ch`,
            }}
            onChange={(val) => {
              if (val) {
                const price = val / item.quantity!;
                updateItem(item.id, {
                  price,
                });
              }
            }}
          />
        </td>
        <td>
          <ActionIcon color={"red"} onClick={() => removeItem(item.id)}>
            <IconTrash />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <Table captionSide="bottom" horizontalSpacing="xs">
      <caption>Tovarlar savadchasi</caption>
      <TableHead
        data={{ ...ths, discounts: discountMode }}
        prefix="sales"
        permissionOf="no-check"
      />
      <tbody>{rows}</tbody>
      <SalesDetails items={items} />
    </Table>
  );
};

export default CartTable;

const getClosestDiscount = (discounts: any[], quantity: number) => {
  let closestDiscount = { price: undefined };
  discounts.forEach((discount) => {
    if (discount.quantity <= quantity) {
      closestDiscount = discount;
    }
  });
  return closestDiscount;
};
