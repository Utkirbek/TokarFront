import { getCookie } from "cookies-next";

import requests from "./requests";

const shopId = getCookie("shopId");

const sitatisticsSpendFetcher = {
  getSitatisticsSpend: async () =>
    requests.get(`/statistics/${shopId}/pie/spend`),
};

export default sitatisticsSpendFetcher;
