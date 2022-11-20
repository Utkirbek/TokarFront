import WithLoading from "@hoc/WithLoading";
import useUsers from "@services/hooks/useUser";

import UsersTable from "./components/UsersTable";

const Users = () => {
  const { useFetchUsers } = useUsers();

  const usersQuery = useFetchUsers();
  const { data } = usersQuery;

  return (
    <>
      <WithLoading query={usersQuery}>
        <UsersTable data={data} />
      </WithLoading>
    </>
  );
};
export default Users;
