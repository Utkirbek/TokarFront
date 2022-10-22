import DashLayout from "@modules/layout/DashLayout";

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
