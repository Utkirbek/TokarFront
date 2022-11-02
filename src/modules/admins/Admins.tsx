import If from "@components/smart/If";
import DashLayout from "@modules/layout/DashLayout";
import { Permissions } from "@utils/constants";

import AdminsTable from "./components/AdminsTable";

type Props = {};

const Admins = (props: Props) => {
  return (
    <DashLayout>
      <If hasPerm={Permissions.admins.view}>
        <AdminsTable />
      </If>
    </DashLayout>
  );
};
export default Admins;
