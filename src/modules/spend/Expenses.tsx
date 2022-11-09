import WithLoading from "@hoc/WithLoading";
import spendFetchers from "@services/api/spendFetchers";
import { RequestQueryKeys } from "@utils/constants";
import dynamic from "next/dynamic";
import useSWR from "swr";

import SpendTable from "./component/tableSpend";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

export default function Spend() {
  const spendsQuery = useSWR(RequestQueryKeys.getSpend, spendFetchers.getSpend);
  const { data } = spendsQuery;

  return (
    <DashLayout>
      <WithLoading withRenderProps query={spendsQuery}>
        <SpendTable />
      </WithLoading>
    </DashLayout>
  );
}
