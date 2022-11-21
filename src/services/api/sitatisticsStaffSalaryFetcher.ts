import requests from "./requests";

const sitatisticsStaffSalaryFetcher = {
  getSitatisticsStaffSalary: async () =>
    requests.get("/statistics/pie/staffSalary"),
};
export default sitatisticsStaffSalaryFetcher;
