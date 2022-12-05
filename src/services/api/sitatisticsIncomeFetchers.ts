import { getCookie } from "cookies-next";

import requests from "./requests";

const shopId = getCookie("shopId");

const sitatisticsIncomeFetcher = {
  getSitatisticsIncome: async () =>
    requests.get(`/statistics/${shopId}/pie/income`),
};

export default sitatisticsIncomeFetcher;
