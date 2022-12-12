import statisticsFetchers from "@services/api/statisticsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSitatisticsSpend = () => {
  return {
    useFetchSitatistcsSpend: () =>
      useSWR(
        RequestQueryKeys.getSitatisticsSpend,
        statisticsFetchers.getSpent
      ),
  };
};

export default useSitatisticsSpend;
