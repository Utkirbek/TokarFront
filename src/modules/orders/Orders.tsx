import WithLoading from "@hoc/WithLoading";
import orderFetchers from "@services/api/orderFetchers";
import { RequestQueryKeys } from "@utils/constants";
import dynamic from "next/dynamic";
import useSWR from "swr";

import OrdersTable from "./components/OrdersTable";
import OrdersDetails from "./modalOrder/Orderdetail";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

export default function Orders() {
  const ordersQuery = useSWR(
    RequestQueryKeys.getOrders,
    orderFetchers.getOrders
  );

  return (
    <>
      <DashLayout>
        <WithLoading withRenderProps query={ordersQuery}>
          <OrdersTable />
          <OrdersDetails />
        </WithLoading>
      </DashLayout>
    </>
  );
}
