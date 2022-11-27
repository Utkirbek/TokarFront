import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import orderFetchers from "@services/api/orderFetchers";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import { useState } from "react";
import useSWR from "swr";

import OrdersTable from "./components/OrdersTable";

export default function Orders() {
  const [page, setPage] = useState(1);
  const ordersQuery = useSWR(
    RequestQueryKeys.getOrders,
    orderFetchers.getOrders
  );

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
