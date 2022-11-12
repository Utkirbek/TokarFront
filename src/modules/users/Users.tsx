import WithLoading from "@hoc/WithLoading";
import { useToggle } from "@mantine/hooks";
import useUsers from "@services/hooks/useUsers";
import dynamic from "next/dynamic";
import { memo, useState } from "react";

import ProductDetails from "./batafsil";
import UsersDrawer from "./components/UsersDrawer";
import UsersTable from "./components/UsersTable";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

const Users = () => {
  const [editItem, setEditItem] = useState({});
  const [opened, toggleOpened] = useToggle();
  const { useFetchUsers } = useUsers();

  const usersQuery = useFetchUsers();
  const { data } = usersQuery;

  return (
    <DashLayout>
      <UsersDrawer {...{ editItem, setEditItem, opened, toggleOpened }} />
      <WithLoading query={usersQuery}>
        <UsersTable
          setEditItem={setEditItem}
          toggleOpened={toggleOpened}
          data={data}
        />
        <ProductDetails data={data} />
      </WithLoading>
    </DashLayout>
  );
};

export default memo(Users);
