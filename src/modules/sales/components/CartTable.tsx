import TableHead from "@components/Table/TableHead";
import { ActionIcon, Group, NumberInput, Table } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons";
import { floorLastThreeDigits } from "@utils";
import React from "react";
import { useCart } from "react-use-cart";

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

  const rows = items.map((item, index) => (
    <tr key={index}>
      <td>{index}</td>
      <td>{item.code}</td>
      <td>{item.title}</td>
      <td>
        <NumberInput
          hideControls
          min={0}
          precision={1}
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
          >
            <IconMinus />
          </ActionIcon>
          <NumberInput
            precision={1}
            hideControls
            value={item.quantity}
            size="xs"
            min={0}
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
    </Table>
  );
};

export default CartTable;
