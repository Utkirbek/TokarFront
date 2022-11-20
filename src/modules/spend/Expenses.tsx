import Currency from "@components/currencyConvert/currency";
import CurrencyTable from "@components/currencyConvert/currencyConvert";
import WithLoading from "@hoc/WithLoading";
import spendFetchers from "@services/api/spendFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import SpendTable from "./component/tableSpend";

export default function Spend() {
  const spendsQuery = useSWR(RequestQueryKeys.getSpend, spendFetchers.getSpend);
  const { data } = spendsQuery;

  return (
    <WithLoading withRenderProps query={spendsQuery}>
      <SpendTable />
      <Currency/>
    </WithLoading>
  );
}
