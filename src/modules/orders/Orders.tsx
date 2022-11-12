import WithLoading from "@hoc/WithLoading";
import orderFetchers from "@services/api/orderFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import OrdersTable from "./components/OrdersTable";
import OrdersDetails from "./modalOrder/Orderdetail";

export default function Orders() {
  const ordersQuery = useSWR(
    RequestQueryKeys.getOrders,
    orderFetchers.getOrders
  );

  return (
    <WithLoading withRenderProps query={ordersQuery}>
      <OrdersTable />
      <OrdersDetails />
    </WithLoading>
  );
}
