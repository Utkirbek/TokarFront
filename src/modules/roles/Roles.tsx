import dynamic from "next/dynamic";

import RolesTable from "./components/RolesTable";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

const Admins = () => {
  return (
    <DashLayout>
      <RolesTable />
    </DashLayout>
  );
};
export default Admins;
