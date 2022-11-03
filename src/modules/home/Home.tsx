import If from "@components/smart/If";
import Statistica from "@modules/statistica";
import { Permissions } from "@utils/constants";
import dynamic from "next/dynamic";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

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
