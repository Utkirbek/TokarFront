import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import { Divider, Grid, ScrollArea } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import productFetchers from "@services/api/productFetchers";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import { CartProvider } from "react-use-cart";

import ActionsTooltip from "./components/ActionsTooltip";
import CartTable from "./components/CartTable";
import { Product } from "./components/constants";
import SalesInfoArea from "./components/SalesInfoArea";
import SearchResultsTable from "./components/SearchResultsTable";

const Sales: NextPage = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  const onSearchResults = useCallback((results: any) => {
    setSearchResults(results);
  }, []);

  const onSearchClear = useCallback(() => {
    setSearchResults([]);
  }, []);

  useHotkeys([
    [
      "alt+p",
      () => {
        alert("print check");
      },
    ],
  ]);

  return (
    <CartProvider id="tespen-cart" key={"tespen-cart"}>
      <Grid
        grow
        gutter={5}
        pb={10}
        align="space-between"
        sx={{ height: "100%" }}
      >
        <Grid.Col span={12} sx={{ height: "5%" }}>
          <SearchAutoComplete
            searchResults={searchResults}
            onSearchResults={onSearchResults}
            onClear={onSearchClear}
            fetcher={productFetchers.getProductByTitle}
          />
        </Grid.Col>
        <Grid.Col span={12} sx={{ height: "90%" }}>
          <Grid>
            <Grid.Col span={9}>
              <ScrollArea sx={{ height: "45vh" }}>
                <CartTable />
              </ScrollArea>
              <If condition={searchResults.length > 0}>
                <Divider my={10} />
                <ScrollArea sx={{ height: "32vh" }}>
                  <SearchResultsTable searchResults={searchResults} />
                </ScrollArea>
              </If>
            </Grid.Col>
            <Grid.Col span={3}>
              <SalesInfoArea />
            </Grid.Col>
          </Grid>
        </Grid.Col>

        <Grid.Col span={12} sx={{ height: "5%" }}>
          <ActionsTooltip />
        </Grid.Col>
      </Grid>
    </CartProvider>
  );
};

export default Sales;
