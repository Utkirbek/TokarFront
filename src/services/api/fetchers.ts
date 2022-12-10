import requests from "./requests";

const fetchers = {
  imageUpload: async <T>(body: T) => await requests.post("/upload", body),
};

export default fetchers;
