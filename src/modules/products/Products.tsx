import WithLoading from "@hoc/WithLoading";
import { Pagination } from "@mantine/core";
import { SpotlightAction, useSpotlight } from "@mantine/spotlight";
import productFetchers from "@services/api/productFetchers";
import useProducts from "@services/hooks/useProducts";
import { IconHome, IconTable } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CartProvider } from "react-use-cart";

import ProductsTable from "./components/ProductsTable";
import ProdactCard from "./components/ProductsTable/components/card";

const Products = () => {
  const [page, setPage] = useState(1);
  const spotlight = useSpotlight();
  const router = useRouter();
  const { useFetchProduct } = useProducts();
  const componentRef = useRef(null);
  const [card, setCard] = useState(false);

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
        <IconTable
          onClick={() => setCard(!card)}
          style={{
            fontSize: "35px",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        />
        {card ? (
          <ProdactCard data={data?.products} />
        ) : (
          <ProductsTable data={data?.products} />
        )}
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
