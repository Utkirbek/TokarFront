import { SpotlightAction, useSpotlight } from "@mantine/spotlight";
import DashLayout from "@modules/layout/DashLayout";
import productFetchers from "@services/api/productFetchers";
import { IconHome } from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CartProvider } from "react-use-cart";

import ProductsTable from "./components/ProductsTable";

type Props = {};

const Products = (props: Props) => {
  const spotlight = useSpotlight();
  const router = useRouter();

  useEffect(() => {
    if (spotlight.opened) {
      if (spotlight.query && spotlight.query.length % 3 === 0) {
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

  return (
    <DashLayout>
      <CartProvider>
        <ProductsTable />
      </CartProvider>
    </DashLayout>
  );
};

export default Products;
