import DashLayout from "@modules/layout/DashLayout";
import React from "react";

import AdminsTable from "./components/AdminsTable";

type Props = {};

const Admins = (props: Props) => {
  return (
    <DashLayout>
      <AdminsTable />
    </DashLayout>
  );
};
export default Admins;
