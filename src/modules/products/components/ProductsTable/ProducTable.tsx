import {
  Avatar,
  Checkbox,
  createStyles,
  Group,
  Loader,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import productFetchers from "@services/api/productFetchers";
import { IconEdit, IconTrash } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default function FormMantine() {
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

  const { mutate } = useSWRConfig();

  const {
    data,
    error,
    mutate: refresh,
  } = useSWR(RequestQueryKeys.getProducts, productFetchers.getProducts);

  if (error) return <div>yuklash xatosi</div>;
  if (!data)
    return (
      <div>
        <Loader />
      </div>
    );

  const handleDelete = async function () {
    const res = await getProducts(
      RequestQueryKeys.getProducts,
      productFetchers.getProducts,
      {
        revalidate: true,
      }
    );
  };

  const rows = data.map((item: any) => {
    const selected = selection.includes(item._id);
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
          />
          <IconEdit style={{ cursor: "pointer" }} />
        </td>
      </tr>
    );
  });

  return (
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
  );
}
function getProducts(
  getProducts: RequestQueryKeys,
  getProducts1: () => Promise<any>,
  arg2: { revalidate: boolean }
) {
  throw new Error("Function not implemented.");
}
