import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import FormDrawer from "@components/Drawer/FormDrawer";
import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import { Box, Button, Chip, Grid, Pagination, ScrollArea } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import productFetchers from "@services/api/productFetchers";
import { IconTable } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import BuyCart from "../buyCart/BuyCart";
import CardView from "../CardView";
import FormProduct from "../form/FormAdd";
import TableView from "../TableView";
import ProductDetails from "./components/ProductDetails";

function ProductsTable({
  data,
  page,
  onPageChange,
  total,
  minQuantity,
  noPrice,
  toggleMinQuantity,
  toggleNoPrice,
}: {
  data: any;
  page: number;
  onPageChange: (page: number) => void;
  total: number;
  minQuantity: boolean;
  noPrice: boolean;
  toggleMinQuantity: (bool?: boolean) => void;
  toggleNoPrice: (bool?: boolean) => void;
}) {
  const [editItem, setEditItem] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [opened, toggleOpened] = useToggle();
  const [salesView, toggleSalesView] = useToggle();
  const [isResultsActive, toggleResultsActive] = useToggle();

  const { isEmpty } = useCart();

  const onEdit = useCallback((item: any) => {
    setEditItem(item);
    toggleOpened(true);
  }, []);

  const handleClick = useCallback(() => {
    toggleOpened(true);
    setEditItem({});
  }, []);

  const onSearchResults = useCallback((results: any) => {
    setSearchResults(results);
    toggleResultsActive(true);
  }, []);

  const onSearchClear = useCallback(() => {
    setSearchResults([]);
    toggleResultsActive(false);
  }, []);

  const activeData = isResultsActive ? searchResults : data;

  if (data?.length === 0) return <EmptyBox />;

  return (
    <Box sx={{ height: "100%" }}>
      <FormDrawer {...{ opened, toggleOpened }}>
        <ScrollArea
          style={{ height: "100%", paddingBottom: 60 }}
          scrollbarSize={2}
        >
          <FormProduct
            handleClose={() => toggleOpened(false)}
            editItem={editItem}
          />
        </ScrollArea>
      </FormDrawer>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button variant="light" onClick={() => toggleSalesView()}>
          <IconTable />
        </Button>
        <If hasPerm={Permissions.products.create}>
          <SearchAutoComplete
            searchResults={searchResults}
            onSearchResults={onSearchResults}
            onClear={onSearchClear}
            fetcher={productFetchers.getProductByTitle}
          />
          <Button onClick={handleClick} variant={"outline"}>
            <FormattedMessage id="products.add" />
          </Button>
        </If>
      </Box>

      <Grid pt={10}>
        <Grid.Col
          span={isEmpty ? 12 : 9}
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
          }}
        >
          <If
            condition={activeData?.length === 0}
            elseChildren={
              <>
                <If
                  condition={salesView}
                  elseChildren={
                    <Box>
                      <Chip.Group
                        position="left"
                        my={5}
                        onChange={(value) => {
                          if (value.includes("min_quantity")) {
                            toggleMinQuantity(true);
                          } else {
                            toggleMinQuantity(false);
                          }
                          if (value.includes("no_price")) {
                            toggleNoPrice(true);
                          } else {
                            toggleNoPrice(false);
                          }
                        }}
                      >
                        <If hasPerm={Permissions.products.originalPrice}>
                          <Chip value={"no_price"}>
                            <FormattedMessage id="products.no_price" />
                          </Chip>
                        </If>
                        <Chip value={"min_quantity"}>
                          <FormattedMessage id="products.min_quantity" />
                        </Chip>
                      </Chip.Group>
                      <TableView
                        onEdit={onEdit}
                        data={activeData}
                        minStock={minQuantity}
                      />
                    </Box>
                  }
                >
                  <CardView data={activeData} />
                </If>
                <Pagination
                  my={10}
                  page={page}
                  styles={(theme) => ({
                    item: {
                      "&[data-active]": {
                        backgroundImage: theme.fn.gradient({
                          from: "red",
                          to: "yellow",
                        }),
                      },
                    },
                  })}
                  total={total}
                  onChange={onPageChange}
                />
              </>
            }
          >
            <EmptyBox id="noSearchResults" />
          </If>
        </Grid.Col>
        <If condition={!isEmpty}>
          <Grid.Col span={3}>
            <BuyCart />
          </Grid.Col>
        </If>
      </Grid>
      <ProductDetails products={data} />
    </Box>
  );
}

export default memo(ProductsTable);
