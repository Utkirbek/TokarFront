import WithLoading from "@hoc/WithLoading";
import { useToggle } from "@mantine/hooks";
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
  const [minQuantity, toggleMinQuantity] = useToggle();
  const [noPrice, toggleNoPrice] = useToggle();
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
  }, [router, spotlight, spotlight.query]);

  const getProductsQuery = useFetchProduct(page, {
    minQuantity,
    noPrice,
    perPage: 10,
  });
  const { data } = getProductsQuery;

  return (
    <CartProvider>
      <WithLoading query={getProductsQuery}>
        <ProductsTable
          data={data?.products}
          total={data?.totalPage}
          page={page}
          onPageChange={(page: number) => setPage(page)}
          minQuantity={minQuantity}
          noPrice={noPrice}
          toggleMinQuantity={toggleMinQuantity}
          toggleNoPrice={toggleNoPrice}
        />
      </WithLoading>
    </CartProvider>
  );
};

export default Products;
