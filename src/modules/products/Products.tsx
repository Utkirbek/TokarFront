import WithLoading from "@hoc/WithLoading";
import { Pagination } from "@mantine/core";
import { SpotlightAction, useSpotlight } from "@mantine/spotlight";
import productFetchers from "@services/api/productFetchers";
import useProducts from "@services/hooks/useProducts";
import { IconHome } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CartProvider } from "react-use-cart";

import ProductsTable from "./components/ProductsTable";

const Products = () => {
  const [page, setPage] = useState(1);
  const spotlight = useSpotlight();
  const router = useRouter();
  const { useFetchProduct } = useProducts();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotlight.query]);

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
      </WithLoading>
    </CartProvider>
  );
};

export default Products;
