import DashLayout from "@modules/layout/DashLayout";
import React from "react";

import RolesTable from "./components/RolesTable";

type Props = {};

const Admins = (props: Props) => {
  return (
    <DashLayout>
      <RolesTable />
    </DashLayout>
  );
};
export default Admins;
