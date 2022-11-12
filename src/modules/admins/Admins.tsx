import If from "@components/smart/If";
import { Permissions } from "@utils/constants";

import AdminsTable from "./components/AdminsTable";

type Props = {};

const Admins = (props: Props) => {
  return (
    <If hasPerm={Permissions.admins.view}>
      <AdminsTable />
    </If>
  );
};
export default Admins;
