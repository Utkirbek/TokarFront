import sitatisticsStaffSalaryFetcher from "@services/api/sitatisticsStaffSalaryFetcher";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSitatisticsStaffSalary = () => {
  return {
    useFetchSitatistcsStaffSalary: () =>
      useSWR(
        RequestQueryKeys.getSitatisticsStaffSalary,
        sitatisticsStaffSalaryFetcher.getSitatisticsStaffSalary
      ),
  };
};
export default useSitatisticsStaffSalary;
