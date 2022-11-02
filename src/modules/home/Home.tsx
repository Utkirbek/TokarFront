import If from "@components/smart/If";
import DashLayout from "@modules/layout/DashLayout";
import Statistica from "@modules/statistica";
import { Permissions } from "@utils/constants";

const Home = () => {
  return (
    <DashLayout>
      <If hasPerm={Permissions.statistica.view}>
        <Statistica />
      </If>
    </DashLayout>
  );
};

export default Home;
