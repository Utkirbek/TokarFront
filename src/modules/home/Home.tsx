import If from "@components/smart/If";
import Statistica from "@modules/statistica";
import { Permissions } from "@utils/constants";

const Home = () => {
  return (
    <If hasPerm={Permissions.statistica.view}>
      <Statistica />
    </If>
  );
};

export default Home;
