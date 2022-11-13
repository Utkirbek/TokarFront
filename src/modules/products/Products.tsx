import ComponentToPrint from "@components/print/ComponentToPrint";
import WithLoading from "@hoc/WithLoading";
import { Box, Button, Pagination } from "@mantine/core";
import { SpotlightAction, useSpotlight } from "@mantine/spotlight";
import productFetchers from "@services/api/productFetchers";
import useProducts from "@services/hooks/useProducts";
import { IconHome } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CartProvider } from "react-use-cart";

import ProductsTable from "./components/ProductsTable";

const Products = () => {
  const [page, setPage] = useState(1);
  const spotlight = useSpotlight();
  const router = useRouter();
  const { useFetchProduct } = useProducts();
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    if (spotlight.opened) {
      if (spotlight.query && spotlight.query.length % 2 === 0) {
        productFetchers.getProductByTitle(spotlight.query).then((res) => {
          if (!!res && res?.length > 0) {
            const newActions: SpotlightAction[] = res.map((item: any) => ({
              id: item._id,
              title: item.title,
              description: item.description,
              onTrigger: () =>
                router.push("/products", {
                  query: {
                    details: item._id,
                  },
                }),
              icon: <IconHome size={18} />,
            }));

            spotlight.registerActions(newActions);
          }
        });
      }
    }
  }, [router, spotlight, spotlight.query]);

  const getProductsQuery = useFetchProduct(page);
  const { data } = getProductsQuery;

  return (
    <CartProvider>
      <WithLoading query={getProductsQuery}>
        <ProductsTable data={data?.products} />
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
          total={data?.totalPage}
          onChange={(page) => setPage(page)}
        />
        <Box>
          <ComponentToPrint ref={componentRef} />
          <Button mt={18} onClick={handlePrint}>
            Shuni chop etish
          </Button>
        </Box>
      </WithLoading>
    </CartProvider>
  );
};

export default Products;
