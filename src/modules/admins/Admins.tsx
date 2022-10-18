import Table from "@components/table";
import DashLayout from "@modules/layout/DashLayout";
import React from "react";

type Props = {};

const Admins = (props: Props) => {
  return (
    <DashLayout>
      <Table />
    </DashLayout>
  );
};
export default Admins;
