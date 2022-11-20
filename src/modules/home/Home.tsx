import If from "@components/smart/If";
import useUser from "@hooks/shared/useUser";
import Statistica from "@modules/statistica";
import { Permissions } from "@utils/constants";
import { useRouter } from "next/router";

const Home = () => {
  const { hasPerm } = useUser();
  const router = useRouter();

  if (!hasPerm(Permissions.statistica.view)) {
    router.push("/products");
  }

  return (
    <If hasPerm={Permissions.statistica.view}>
      <Statistica />
    </If>
  );
};

export default Home;
