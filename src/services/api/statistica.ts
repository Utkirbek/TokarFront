import requests from "./requests";

const statistica = {
  getStatistica: async <T>(body: T) => await requests.post("/spend/add", body),
};

export default statistica;
