import create from "zustand";
import { persist } from "zustand/middleware";

import User from "@/types/User";

type UserActions = {
  permissions: string[];
  isLoggedIn: boolean;

  updateUser: (user: User) => void;
  authorize: (user: User) => void;
  hasPerm: (perm: string) => boolean;
};

const useUser = create(
  persist<User & UserActions>(
    (set, get) => ({
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

      updateUser: (user) => set({ ...user }),
      authorize: (user) => set({ ...user, isLoggedIn: true }),
      hasPerm: (perm) => get().permissions.includes(perm),
    }),
    {
      name: "tokar-user",
    }
  )
);

export default useUser;
