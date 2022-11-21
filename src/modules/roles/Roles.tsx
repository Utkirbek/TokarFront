import If from "@components/smart/If";
import { Permissions } from "@utils/constants";

import RolesTable from "./components/RolesTable";

const Roles = () => {
  return (
    <If hasPerm={Permissions.roles.view}>
      <RolesTable />;
    </If>
  );
};
export default Roles;
