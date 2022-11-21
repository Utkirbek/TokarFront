import requests from "./requests";

const sitatisticsIncomeFetcher = {
  getSitatisticsIncome: async () => requests.get("/statistics/pie/income"),
};

export default sitatisticsIncomeFetcher;
