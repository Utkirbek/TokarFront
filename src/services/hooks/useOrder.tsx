import orderFetcher from "@services/api/orderFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const revalidate = {
  revalidate: true,
};

const useOrders = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchOrders: (
      page = 1,
      options = {
        perPage: 10,
      }
    ) =>
      useSWR([RequestQueryKeys.getOrders, page], (_, page) =>
        orderFetcher.getOrders(page, {
          perPage: options?.perPage,
        })
      ),
    addOrder: async (
      body: {
        total: number;
        paymentMethod: string;
        loanTotal: number;
        cashTotal: number;
        shouldPay: string;
        salesman: string;
        user?: string;
        hasLoan: boolean;
        cart: {
          product: string;
          quantity: number;
          price: number;
          unit?: string;
        }[];
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.addOrders,
          orderFetcher.addOrders(body),
          revalidate
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getOrders);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    editOrder: async (
      data: {
        id: string;
        values: any;
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.updateOrders,
          orderFetcher.updateOrder(data.id, data.values)
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getOrders);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    deleteOrder: async (
      id: string,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.deleteOrders,
          orderFetcher.deleteOrders(id),
          revalidate
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getOrders);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },

    useFetchOrder: (id: string, options: object) =>
      useSWR(
        id ? [RequestQueryKeys.GET_ORDER, id] : null,
        (_, id) => orderFetcher.getOrder(id),
        options
      ),
  };
};

export default useOrders;
