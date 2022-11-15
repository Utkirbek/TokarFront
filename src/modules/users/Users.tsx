import WithLoading from "@hoc/WithLoading";
import useUsers from "@services/hooks/useUsers";

import ProductDetails from "./batafsil";
import UsersTable from "./components/UsersTable";

const Users = () => {
  const { useFetchUsers } = useUsers();

  const usersQuery = useFetchUsers();
  const { data } = usersQuery;

  return (
    <>
      <WithLoading query={usersQuery}>
        <UsersTable data={data} />
        <ProductDetails data={data} />
      </WithLoading>
    </>
  );
};
export default Users;
