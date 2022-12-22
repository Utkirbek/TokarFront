import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import { useToggle } from "@mantine/hooks";
import useOrders from "@services/hooks/useOrder";
import { Permissions } from "@utils/constants";
import { useState } from "react";

import OrdersTable from "./components/OrdersTable";

export default function Orders() {
  const [page, setPage] = useState(1);
  const { useFetchOrders } = useOrders();
  const ordersQuery = useFetchOrders(page, {
    perPage: 10,
  });

  const { data } = ordersQuery;

  return (
    <If hasPerm={Permissions.orders.view}>
      <WithLoading withRenderProps query={ordersQuery}>
        <OrdersTable
          dataorder={data?.orders}
          total={data?.totalPage}
          page={page}
          onPageChange={(page: number) => setPage(page)}
        />
      </WithLoading>
    </If>
  );
}
