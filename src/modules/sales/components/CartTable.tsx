import TableHead from "@components/Table/TableHead";
import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import { selectIsRefund } from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import {
  ActionIcon,
  Avatar,
  Group,
  NumberInput,
  Table,
  Text,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { floorLastThreeDigits } from "@utils";
import { useRouter } from "next/router";
import React, { useState } from "react";
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

  const rows = items.map((item, index) => (
    <tr key={index}>
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
                  details: item._id,
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
            }}
            disabled={item.quantity === 1}
          >
            <IconMinus />
          </ActionIcon>
          <NumberInput
            precision={1}
            hideControls
            value={item.quantity}
            size="xs"
            min={0}
            max={isRefund ? item.quantity : undefined}
            sx={{
              width: `${
                item.quantity && item.quantity.toString?.()?.length + 4
              }ch`,
            }}
            onChange={(val) => {
              if (val) updateItemQuantity(item.id, Number(val));
            }}
          />
          <ActionIcon
            color={"green"}
            onClick={() => {
              updateItemQuantity(item.id, item.quantity! + 1);
            }}
            disabled={isRefund}
          >
            <IconPlus />
          </ActionIcon>
        </Group>
      </td>
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
  ));

  return (
    <Table captionSide="bottom">
      <caption>Tovarlar savadchasi</caption>
      <TableHead data={ths} prefix="sales" permissionOf="no-check" />
      <tbody>{rows}</tbody>
      <SalesDetails items={items} />
    </Table>
  );
};

export default CartTable;
