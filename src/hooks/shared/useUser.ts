import create from "zustand";
import { persist } from "zustand/middleware";

import User from "@/types/User";

const initalState: User = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  image: "",
  createdAt: "",
  updatedAt: "",
  permissions: [],
  isLoggedIn: false,
};

type UserAction = {
  updateUser: (user: User) => void;
  authorize: (user: User) => void;
  hasPerm: (perm: string) => boolean;
  logout: () => void;
};

const useUser = create(
  persist<User & UserAction>(
    (set, get) => ({
      ...initalState,

      updateUser: (user) => set({ ...user }),
      authorize: (user) => set({ ...user, isLoggedIn: true }),
      hasPerm: (perm) => get().permissions.includes(perm),
      logout: () => set({ ...initalState }),
    }),
    {
      name: "tokar-user",
    }
  )
);

export default useUser;
