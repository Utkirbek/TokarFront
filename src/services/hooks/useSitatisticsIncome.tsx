import statisticsFetchers from "@services/api/statisticsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSitatisticsIncome = () => {
  return {
    useFetchSitatistcsIncome: () =>
      useSWR(
        RequestQueryKeys.getSitatisticsIncome,
        statisticsFetchers.getIncome
      ),
  };
};

export default useSitatisticsIncome;
