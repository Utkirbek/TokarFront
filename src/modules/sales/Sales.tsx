import SalesPrint from "@components/print/SalesPrint";
import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import { selectSalesmanId } from "@hooks/shared/selectors";
import useUser from "@hooks/shared/useUser";
import { Box, Divider, Grid, ScrollArea } from "@mantine/core";
import { createFormContext } from "@mantine/form";
import { useHotkeys } from "@mantine/hooks";
import productFetchers from "@services/api/productFetchers";
import { NextPage } from "next";
import { useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CartProvider } from "react-use-cart";

import ActionsTooltip from "./components/ActionsTooltip";
import CartTable from "./components/CartTable";
import { Product } from "./components/constants";
import SalesInfoArea from "./components/SalesInfoArea";
import SearchResultsTable from "./components/SearchResultsTable";

export type SalesFormValues = {
  customer: string;
  installmentDate: string;
  installmentAmount: number;
  paymentMethod: string;
  initialPaymentAmount: number;
  salesman: string;
};

export const [SalesFormProvider, useSalesFormContext, useSalesForm] =
  createFormContext<SalesFormValues>();

const Sales: NextPage = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const componentRef = useRef(null);
  const salesmanId = useUser(selectSalesmanId);

  const form = useSalesForm({
    initialValues: {
      paymentMethod: "cash",
      installmentAmount: 0,
      installmentDate: "",
      customer: "",
      initialPaymentAmount: 0,
      salesman: salesmanId,
    },
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onSearchResults = useCallback((results: any) => {
    setSearchResults(results);
  }, []);

  const onSearchClear = useCallback(() => {
    setSearchResults([]);
  }, []);

  useHotkeys([["alt+p", handlePrint]]);

  return (
    <SalesFormProvider form={form}>
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
          <Grid.Col span={12} sm={12} sx={{ height: "90%" }}>
            <Grid>
              <Grid.Col span={9} sm={9} xs={12}>
                <ScrollArea
                  sx={{ height: !searchResults.length ? "80vh" : "45vh" }}
                >
                  <CartTable />
                </ScrollArea>
                <If condition={searchResults.length > 0}>
                  <Divider my={10} />
                  <ScrollArea sx={{ height: "32vh" }}>
                    <SearchResultsTable searchResults={searchResults} />
                  </ScrollArea>
                </If>
              </Grid.Col>
              <Grid.Col span={3} sm={3} xs={12}>
                <SalesInfoArea />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={12} sx={{ height: "5%" }}>
            <ActionsTooltip handlePrint={handlePrint} />
          </Grid.Col>
        </Grid>
        <Box sx={{ display: "none" }}>
          <SalesPrint ref={componentRef} />
        </Box>
      </CartProvider>
    </SalesFormProvider>
  );
};

export default Sales;
