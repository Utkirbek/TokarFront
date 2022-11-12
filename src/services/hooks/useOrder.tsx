import orderFetcher from "@services/api/orderFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const revalidate = {
  revalidate: true,
};

const useOrders = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchOrders: () =>
      useSWR(RequestQueryKeys.getOrders, orderFetcher.getOrders),
    addOrder: async (
      body: {
        user: string;
        salesman: string;
        cart: string;
        total: string;
        payment: string;
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
          orderFetcher.updateOrders(data.id, data.values)
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
  };
};

export default useOrders;
