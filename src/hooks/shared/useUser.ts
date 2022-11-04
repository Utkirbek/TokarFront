import { Permissions } from "@utils/constants";
import create from "zustand";
import { persist } from "zustand/middleware";

import User from "@/types/User";

const initalState: User = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  role: {
    _id: "",
    name: "",
    permissions: [],
  },
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
      authorize: (user: any) =>
        set({
          isLoggedIn: true,
          image: user.image,
          name: user.admin.name,
          email: user.admin.email,
          orders: user.admin.orders,
          permissions: user.admin.role.permissions,
          role: user.admin.role,
        }),
      hasPerm: (perm) =>
        get().permissions.some(
          (p) => p.name === perm || p.name === Permissions.all
        ),
      logout: () => set({ ...initalState }),
    }),
    {
      name: "tokar-user",
    }
  )
);

export default useUser;
