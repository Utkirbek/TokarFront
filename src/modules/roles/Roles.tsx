import dynamic from "next/dynamic";

import RolesTable from "./components/RolesTable";

type Props = {};
const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

const Admins = (props: Props) => {
  return (
    <DashLayout>
      <RolesTable />
    </DashLayout>
  );
};
export default Admins;
