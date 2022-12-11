import create from "zustand";
import { persist } from "zustand/middleware";

export type SalesState = {
  isRefund: boolean;
  isInstallment: boolean;
  payementMethod: string;
  initialPayment: number;
  installmentAmount: number;
  installmentDuration: Date | string | null;
  lastSale: any;
  searchOrderId: string;
};

const initalState: SalesState = {
  isRefund: false,
  isInstallment: false,
  payementMethod: "",
  initialPayment: 0,
  installmentAmount: 0,
  installmentDuration: null,
  lastSale: null,
  searchOrderId: "",
};

export type SalesActions = {
  setInstallment: (isInstallment: boolean) => void;
  setPayementMethod: (payementMethod: string) => void;
  setInitialPayment: (initialPayment: number) => void;
  setInstallmentAmount: (installmentAmount: number) => void;
  setInstallmentDuration: (installmentDuration: string | null) => void;
  setLastSale: (lastSale: any) => void;
  setIsRefund: (isRefund: boolean) => void;
  setSearchOrderId: (searchOrderId: string) => void;
};

export type SalesStateType = SalesState & SalesActions;

const useSalesState = create(
  persist<SalesState & SalesActions>(
    (set, get) => ({
      ...initalState,
      setInstallment: (isInstallment) => set({ isInstallment }),
      setPayementMethod: (payementMethod) => set({ payementMethod }),
      setInitialPayment: (initialPayment) => set({ initialPayment }),
      setInstallmentAmount: (installmentAmount) => set({ installmentAmount }),
      setInstallmentDuration: (installmentDuration) =>
        set({ installmentDuration }),
      setLastSale: (lastSale) => set({ lastSale }),
      setIsRefund: (isRefund) => set({ isRefund }),
      setSearchOrderId: (searchOrderId) => set({ searchOrderId }),
    }),
    {
      name: "tokar-sales",
    }
  )
);

export default useSalesState;
