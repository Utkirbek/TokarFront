import axios from "axios";
import React from "react";
import useSWR from "swr";

type Props = {};

const requests = axios.create({
  baseURL: "https://toker-mevqk13mg-utkirbek.vercel.app/api",
});

const getUsers = async () => {
  const res = await requests.get("/admin");
  return res.data;
};

const Home = (props: Props) => {
  const { data, error } = useSWR("admins", getUsers);

  if (error) return <div>ошибка загрузки</div>;
  if (!data) return <div>загрузка...</div>;

  console.log(data);

  return <div>Home</div>;
};

export default Home;
