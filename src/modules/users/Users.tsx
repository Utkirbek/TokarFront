import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import useUsers from "@services/hooks/useUsers";
import { Permissions } from "@utils/constants";

import UsersTable from "./components/UsersTable";

const Users = () => {
  const { useFetchUsers } = useUsers();

  const usersQuery = useFetchUsers();
  const { data } = usersQuery;

  return (
    <>
      <If hasPerm={Permissions.users.view}>
        <WithLoading query={usersQuery}>
          <UsersTable data={data} />
        </WithLoading>
      </If>
    </>
  );
};
export default Users;
