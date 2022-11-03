import If from "@components/smart/If";
import { Permissions } from "@utils/constants";
import dynamic from "next/dynamic";

import AdminsTable from "./components/AdminsTable";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

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
