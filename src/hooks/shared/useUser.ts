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
  authNext: () => void;
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
          image: user.admin.image,
          name: user.admin.name,
          email: user.admin.email,
          orders: user.admin.orders,
          permissions: user.admin.role?.permissions,
          role: user.admin.role,
          _id: user.admin._id,
        }),
      authNext: () => {
        set({
          isLoggedIn: true,
        });
      },
      hasPerm: (perm) => {
        return get().permissions?.some(
          (p) => p.name === perm || p.name === Permissions.all
        );
      },
      logout: () => set({ ...initalState }),
    }),
    {
      name: "tespen-user",
    }
  )
);

export default useUser;
