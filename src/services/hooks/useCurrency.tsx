import currencyFetchers from "@services/api/currencyFetcher";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const useCurrency = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchCurrency: () =>
      useSWR(RequestQueryKeys.getCurrency, currencyFetchers.getCurrency),
    addCurrency: async function (
      body: {
        name: string;
        equalsTo: any;
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) {
      try {
        const res = await mutate(
          RequestQueryKeys.addCurrency,
          currencyFetchers.addCurrency(body),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getCurrency);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    editCurrency: async (
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
          RequestQueryKeys.updateCurrency,
          currencyFetchers.updeteCurrency(data.id, data.values),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getCurrency);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    deleteCurrency: async (
      id: string,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.deleteCurrency,
          currencyFetchers.deleteCurrenncy(id),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getCurrency);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },
  };
};

export default useCurrency;
