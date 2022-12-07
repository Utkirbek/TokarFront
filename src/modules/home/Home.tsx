import If from "@components/smart/If";
import useUser from "@hooks/shared/useUser";
import Statistics from "@modules/statistica";
import { Permissions } from "@utils/constants";
import { useRouter } from "next/router";

const Home = () => {
  const { hasPerm } = useUser();
  const router = useRouter();

  if (!hasPerm(Permissions.statistics.view)) {
    router.push("/products");
  }

  return (
    <If hasPerm={Permissions.statistics.view}>
      <Statistics />
    </If>
  );
};

export default Home;
