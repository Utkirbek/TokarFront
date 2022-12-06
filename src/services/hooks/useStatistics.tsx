import statisticsFetchers from "@services/api/statisticsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useStatistics = () => {
  return {
    useFetchProfitBar: () => {
      return useSWR(RequestQueryKeys.GET_PROFIT_BAR, () =>
        statisticsFetchers.getProfitBar()
      );
    },
  };
};

export default useStatistics;
