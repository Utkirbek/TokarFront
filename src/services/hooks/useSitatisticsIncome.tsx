import sitatisticsIncomeFetcher from "@services/api/sitatisticsIncomeFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSitatisticsIncome = () => {
  return {
    useFetchSitatistcsIncome: () =>
      useSWR(
        RequestQueryKeys.getSitatisticsIncome,
        sitatisticsIncomeFetcher.getSitatisticsIncome
      ),
  };
};

export default useSitatisticsIncome;
