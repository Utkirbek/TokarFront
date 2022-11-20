import CurrencyTable from "@components/currencyConvert/currencyConvert";
import WithLoading from "@hoc/WithLoading";
import currencyFetchers from "@services/api/currencyFetcher";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

export default function Currency() {
  const currencyQuery = useSWR(RequestQueryKeys.getCurrency, currencyFetchers.getCurrency);
  const { data } = currencyQuery;

  return (
    <WithLoading withRenderProps query={currencyQuery}>
        <CurrencyTable/>
    </WithLoading>
  );
}
