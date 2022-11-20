import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import { Box, Skeleton } from "@mantine/core";
import useAdmins from "@services/hooks/useAdmins";
import { Permissions } from "@utils/constants";

import AdminsTable from "./components/AdminsTable";

const Admins = () => {
  const { useFetchAdmins } = useAdmins();
  const getAdminsQuery = useFetchAdmins();
  const { data: admins } = getAdminsQuery;
  return (
    <If hasPerm={Permissions.admins.view}>
      <WithLoading query={getAdminsQuery} withRenderProps>
        <AdminsTable data={admins} />
      </WithLoading>
    </If>
  );
};
export default Admins;
