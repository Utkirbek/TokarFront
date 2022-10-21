import { Box } from "@mantine/core";
import DashLayout from "@modules/layout/DashLayout";
import DrawerNew from "@modules/products/components/Drawer";

import ProductsTable from "./components/ProductsTable";

type Props = {};

const Products = (props: Props) => {
  return (
    <DashLayout>
      <ProductsTable />
    </DashLayout>
  );
};

export default Products;
