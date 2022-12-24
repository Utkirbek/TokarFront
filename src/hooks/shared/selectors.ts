import User from "@/types/User";

import { SalesStateType } from "./useSales";

export const selectIsRefund = (state: SalesStateType) => state.isRefund;
export const selectSetIsRefund = (state: SalesStateType) => state.setIsRefund;
export const selectDiscountMode = (state: SalesStateType) => state.dicountMode;
export const selectSetDiscountMode = (state: SalesStateType) =>
  state.setDiscountMode;
export const selectRefundOrderId = (state: SalesStateType) =>
  state.refundOrderId;
export const selectSearchOrderId = (state: SalesStateType) =>
  state.searchOrderId;
export const selectSetSearchOrderId = (state: SalesStateType) =>
  state.setSearchOrderId;
export const selectIsInstallment = (state: SalesStateType) =>
  state.isInstallment;
export const selectSetInstallment = (state: SalesStateType) =>
  state.setInstallment;
export const selectSetRefundOrderId = (state: SalesStateType) =>
  state.setRefundOrderId;

export const selectSalesmanId = (state: User) => state._id;
export const selectIsLoggedIn = (state: User) => state.isLoggedIn;
