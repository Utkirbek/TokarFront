import requests from "./requests";

const userFetcher = {
  getUsers: async () => requests.get(`/user`),
  addUsers: async <T>(body: T) => await requests.post("/user/add", body),
  deleteUsers: async (id: string) => requests.delete(`/user/${id}`),
  updateUsers: async (id: string, body: any | Object) =>
    requests.put(`/user/${id}`, body),
  getUsersByTitle: async (title: string) =>
    requests.get(`/user/search/${title}`),
};

export default userFetcher;
