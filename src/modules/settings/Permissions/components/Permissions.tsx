import WithLoading from "@hoc/WithLoading";
import useSettings from "@services/hooks/useSettings";
import React from "react";

import PermissionCard from "./PermissionCard";

type Props = {};

const PermissionsPage = (props: Props) => {
  const { useFetchAllPermissions } = useSettings();

  const queryPermissions = useFetchAllPermissions();

  return (
    <WithLoading query={queryPermissions}>
      {queryPermissions?.data?.map((permission: any) => (
        <PermissionCard key={permission._id} {...permission} />
      ))}
    </WithLoading>
  );
};

export default PermissionsPage;
