import { Modal, Text } from "@mantine/core";
import { useRouter } from "next/router";
import queryString from "query-string";

type Props = {
  products: any;
};

const ProductDetails = ({ products }: Props) => {
  const router = useRouter();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(products, query.details as string);

  return (
    <Modal size={"90%"} opened={!!item} onClose={() => router.back()}>
      <Text>{item?.title}</Text>
    </Modal>
  );
};

export default ProductDetails;

const findItem = (products: any[], id: string) => {
  return products.find((item: any) => item._id === id);
};
