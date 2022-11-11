import WithLoading from "@hoc/WithLoading";
import spendFetchers from "@services/api/spendFetchers";
import { RequestQueryKeys } from "@utils/constants";
import dynamic from "next/dynamic";
import useSWR from "swr";

// 3 xil
// * Unit test
// * Integration test
// * Automated testing E2E e2e End-to-End testing.
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
