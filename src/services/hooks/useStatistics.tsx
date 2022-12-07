import statisticsFetchers from "@services/api/statisticsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useStatistics = () => {
  return {
    useFetchStats: () => {
      return useSWR(RequestQueryKeys.GET_STATS, () =>
        statisticsFetchers.getStatistics()
      );
    },
    useFetchProfitBar: () => {
      return useSWR(RequestQueryKeys.GET_PROFIT_BAR, () =>
        statisticsFetchers.getProfitBar()
      );
    },
    useFetchStaffSalary: () => {
      return useSWR(RequestQueryKeys.GET_STAFF_SALARY, () =>
        statisticsFetchers.getStaffSalary()
      );
    },
    useFetchSpent: () => {
      return useSWR(RequestQueryKeys.GET_SPENT, () =>
        statisticsFetchers.getSpent()
      );
    },
    useFetchIncome: () => {
      return useSWR(RequestQueryKeys.GET_INCOME, () =>
        statisticsFetchers.getIncome()
      );
    },
  };
};

export default useStatistics;
