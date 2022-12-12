import statisticsFetchers from "@services/api/statisticsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useStatistics = (shopId?: string) => {
  return {
    useFetchStats: () => {
      return useSWR([RequestQueryKeys.GET_STATS, shopId], () =>
        statisticsFetchers.getStatistics(shopId)
      );
    },
    useFetchProfitBar: (isAllTrue: boolean) => {
      return useSWR(
        [RequestQueryKeys.GET_PROFIT_BAR, shopId, isAllTrue],
        (_, activeShopId, allTrue) => {
          return statisticsFetchers.getProfitBar({
            filterShopId: activeShopId,
            isAllTrue: allTrue,
          });
        }
      );
    },
    useFetchStaffSalary: () => {
      return useSWR([RequestQueryKeys.GET_STAFF_SALARY, shopId], () =>
        statisticsFetchers.getStaffSalary(shopId)
      );
    },
    useFetchSpent: () => {
      return useSWR([RequestQueryKeys.GET_SPENT, shopId], () =>
        statisticsFetchers.getSpent(shopId)
      );
    },
    useFetchIncome: () => {
      return useSWR([RequestQueryKeys.GET_INCOME, shopId], () =>
        statisticsFetchers.getIncome(shopId)
      );
    },

    useFetchAllStatistics: () => {
      return useSWR(
        [RequestQueryKeys.GET_ALL_STATISTICS, shopId],
        (_, activeShopId) => {
          return statisticsFetchers.fetchAllStatistics(shopId);
        }
      );
    },
  };
};

export default useStatistics;
