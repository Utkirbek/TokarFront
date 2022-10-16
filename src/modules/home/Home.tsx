import useUser from "@hooks/shared/useUser";
import DashLayout from "@modules/layout/DashLayout";
import adminFetchers from "@services/api/adminFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const Home = () => {
  const { name } = useUser();

  const { data, error } = useSWR(
    RequestQueryKeys.getAdmins,
    adminFetchers.getAdmins
  );

  if (error) return <div>ошибка загрузки</div>;
  if (!data) return <div>загрузка...</div>;

  console.log(data);

  return <DashLayout>Home</DashLayout>;
};

export default Home;
