import DashLayout from "@modules/layout/DashLayout";
import { CartProvider } from "react-use-cart";

import ProductsTable from "./components/ProductsTable";

type Props = {};

const Products = (props: Props) => {
  return (
    <DashLayout>
      <CartProvider>
        <ProductsTable />
      </CartProvider>
    </DashLayout>
  );
};

export default Products;
