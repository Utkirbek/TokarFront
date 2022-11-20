import requests from "./requests";

const sitatisticsSpendFetcher = {
  getSitatisticsSpend: async () => requests.get("/statistics/pie/spend"),
};

export default sitatisticsSpendFetcher;
