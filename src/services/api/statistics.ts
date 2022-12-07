import requests from "./requests";

const statistics = {
  getStatistics: async <T>(body: T) => await requests.post("/spend/add", body),
};

export default statistics;
