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
  refundOrderId: string;
  dicountMode: boolean;
  savedSales: {
    [key: string]: {
      date: string;
      cart: any;
      label?: string;
    };
  };
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
  refundOrderId: "",
  dicountMode: false,
  savedSales: {},
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
  setRefundOrderId: (refundOrderId: string) => void;
  setDiscountMode: (dicountMode: boolean) => void;
  saveNewSale: (sale: { date: string; cart: any; label?: string }) => void;
  removeSavedSale: (dateId: string) => void;
  updateSavedSale: (dateId: string, label: string) => void;
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
      setRefundOrderId: (refundOrderId) => set({ refundOrderId }),
      setDiscountMode: (dicountMode) => set({ dicountMode }),
      saveNewSale: (sale) => {
        const previousSavedSales = get().savedSales;
        const newSavedSales = { ...previousSavedSales, [sale.date]: sale };
        set({ savedSales: newSavedSales });
      },
      removeSavedSale: (dateId) => {
        const previousSavedSales = get().savedSales;
        const newSavedSales = { ...previousSavedSales };
        delete newSavedSales[dateId];
        set({ savedSales: newSavedSales });
      },
      updateSavedSale: (dateId, label) => {
        const previousSavedSales = get().savedSales;
        const newSavedSales = { ...previousSavedSales };
        newSavedSales[dateId].label = label;
        set({ savedSales: newSavedSales });
      },
    }),
    {
      name: "tespen-sales",
    }
  )
);

export default useSalesState;
