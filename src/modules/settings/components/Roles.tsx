import WithLoading from "@hoc/WithLoading";
import useSettings from "@services/hooks/useSettings";
import React from "react";

import RoleCard from "./RoleCard";

type Props = {};

const Roles = (props: Props) => {
  const { useGetAllRoles } = useSettings();

  const queryRoles = useGetAllRoles();

  console.log(queryRoles);

  return (
    <WithLoading query={queryRoles}>
      <h1>Role lar</h1>
      {queryRoles?.data?.map((role: any) => (
        <RoleCard key={role._id} {...role} />
      ))}
    </WithLoading>
  );
};

export default Roles;
