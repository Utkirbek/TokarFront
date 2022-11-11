import spendFetchers from "@services/api/spendFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const revalidate = {
  revalidate: true,
};

const useSpend = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchSpend: () =>
      useSWR(RequestQueryKeys.getSpend, spendFetchers.getSpend),
    addSpend: async (
      body: {
        amount: string;
        paymentMethod: string;
        description: string;
        spendType: string;
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.addSpend,
          spendFetchers.addSpend(body),
          revalidate
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getSpend);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    editSpend: async (
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
          RequestQueryKeys.updateSpend,
          spendFetchers.updateSpend(data.id, data.values)
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getSpend);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    deleteSpend: async (
      id: string,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.deleteSpend,
          spendFetchers.deleteSpend(id),
          revalidate
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getSpend);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },
  };
};

export default useSpend;
