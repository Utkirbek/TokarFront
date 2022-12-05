import { getCookie } from "cookies-next";

import requests from "./requests";

const shopId = getCookie("shopId");

const sitatisticsStaffSalaryFetcher = {
  getSitatisticsStaffSalary: async () =>
    requests.get(`/statistics/${shopId}/pie/staffSalary`),
};
export default sitatisticsStaffSalaryFetcher;
