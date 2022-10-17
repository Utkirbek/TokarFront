import useUser from "@hooks/shared/useUser";
import { Table } from "@mantine/core";
import productFetchers from "@services/api/productFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

function ProducTable() {
  const { mutate } = useSWRConfig();
  const { name, _id } = useUser();
  console.log(name);

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getProducts, productFetchers.getProducts);

  if (error) return <div>yuklash xatosi</div>;
  if (!data) return <div>yuklanmoqda...</div>;

  const handleDelete = async function () {
    const res = await getProducts(
      RequestQueryKeys.getProducts,
      productFetchers.getProducts,
      {
        revalidate: true,
      }
    );
  };

  const rows = data.map((item: any) => {
    console.log(item._id);

    return (
      <tr key={item._id}>
        <td>{item._id}</td>
        <td>{item.title}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
      </tr>
    );
  });

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nomi</th>
            <th>Narxi</th>
            <th>Jami soni</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
}

export default ProducTable;
function getProducts(
  getProducts: RequestQueryKeys,
  getProducts1: () => Promise<any>,
  arg2: { revalidate: boolean }
) {
  throw new Error("Function not implemented.");
}
