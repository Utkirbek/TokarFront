import TableHead from "@components/Table/TableHead";
import { Button, Table } from "@mantine/core";
import { getNumber } from "@utils";
import React, { useCallback, useMemo } from "react";
import { useCart } from "react-use-cart";

import { Product } from "./constants";

const ths = {
  no: true,
  code: true,
  name: true,
  price: true,
  quantity: true,
  actions: true,
};

interface SearchResultsTableProps {
  searchResults: Product[];
}

const SearchResultsTable: React.FC<SearchResultsTableProps> = ({
  searchResults,
}) => {
  const { inCart, addItem, getItem, updateItemQuantity } = useCart();

  const handleAddToCart = useCallback(
    (item: Product) => {
      if (inCart(item._id)) {
        const cartItem = getItem(item._id);
        updateItemQuantity(cartItem._id, cartItem?.quantity + 1);
      } else {
        addItem({
          ...item,
          id: item._id,
          price: getNumber(item.calculatedPrice),
          maxQuantity: item.quantity,
        });
      }
    },
    [inCart, addItem, getItem, updateItemQuantity]
  );
  const rows = useMemo(() => {
    return searchResults?.map((resultItem, index) => (
      <tr key={index}>
        <td>{index}</td>
        <td>{resultItem.code}</td>
        <td>{resultItem.title.substring(0, 40)}</td>
        <td>{resultItem.calculatedPrice}</td>
        <td>{resultItem.quantity}</td>
        <td>
          <Button size="xs" onClick={() => handleAddToCart(resultItem)}>
            Sotish
          </Button>
        </td>
      </tr>
    ));
  }, [searchResults, handleAddToCart]);

  return (
    <Table withColumnBorders sx={{ position: "relative" }}>
      <caption>Qidiruv natijalari</caption>
      <TableHead data={ths} prefix="sales" permissionOf="no-check" />
      <tbody>{rows}</tbody>
    </Table>
  );
};

export default SearchResultsTable;
