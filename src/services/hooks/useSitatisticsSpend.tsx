import sitatisticsSpendFetcher from "@services/api/sitatisticsSpendFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSitatisticsSpend = () => {
  return {
    useFetchSitatistcsSpend: () =>
      useSWR(
        RequestQueryKeys.getSitatisticsSpend,
        sitatisticsSpendFetcher.getSitatisticsSpend
      ),
  };
};

export default useSitatisticsSpend;
