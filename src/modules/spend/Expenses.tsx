import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import spendFetchers from "@services/api/spendFetchers";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import SpendTable from "./component/tableSpend";

export default function Spend() {
  const spendsQuery = useSWR(RequestQueryKeys.getSpend, spendFetchers.getSpend);
  const { data } = spendsQuery;

  return (
    <If hasPerm={Permissions.spends.view}>
      <WithLoading withRenderProps query={spendsQuery}>
        <SpendTable data={data} />
      </WithLoading>
    </If>
  );
}
