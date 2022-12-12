import statisticsFetchers from "@services/api/statisticsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSitatisticsStaffSalary = () => {
  return {
    useFetchSitatistcsStaffSalary: () =>
      useSWR(
        RequestQueryKeys.getSitatisticsStaffSalary,
        statisticsFetchers.getStaffSalary
      ),
  };
};
export default useSitatisticsStaffSalary;
