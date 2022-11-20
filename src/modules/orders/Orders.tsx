import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import orderFetchers from "@services/api/orderFetchers";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import OrdersTable from "./components/OrdersTable";

export default function Orders() {
  const ordersQuery = useSWR(
    RequestQueryKeys.getOrders,
    orderFetchers.getOrders
  );

  const { data } = ordersQuery;

  return (
    <If hasPerm={Permissions.orders.view}>
      <WithLoading withRenderProps query={ordersQuery}>
        <OrdersTable />
      </WithLoading>
    </If>
  );
}
