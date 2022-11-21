import requests from "./requests";

const statisticFetchers = {
  getStatistic: async () => requests.get(`/statistics/main`),
};

export default statisticFetchers;
