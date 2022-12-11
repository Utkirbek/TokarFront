import User from "@/types/User";

import { SalesStateType } from "./useSales";

export const selectIsInstallment = (state: SalesStateType) =>
  state.isInstallment;
export const selectSetInstallment = (state: SalesStateType) =>
  state.setInstallment;

export const selectSalesmanId = (state: User) => state._id;
