import WithLoading from "@hoc/WithLoading";
import orderFetchers from "@services/api/orderFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import OrdersTable from "./components/OrdersTable";

export default function Orders() {
  const ordersQuery = useSWR(
    RequestQueryKeys.getOrders,
    orderFetchers.getOrders
  );

  const { data } = ordersQuery;

  return (
    <WithLoading withRenderProps query={ordersQuery}>
      <OrdersTable />
    </WithLoading>
  );
}
