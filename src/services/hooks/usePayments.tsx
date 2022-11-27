import paymentsFetchers from "@services/api/paymentsFetcher";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const usePayments = () => {
  const { mutate } = useSWRConfig();
  return {
    useFetchPayments: (page = 1) =>
      useSWR([RequestQueryKeys.getPayments, page], (_, page) =>
        paymentsFetchers.getPayment(page)
      ),
    addPayments: async function (
      body: {
        amount: string;
        paymentMethod: any;
        salesman: any;
        loan: any;
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) {
      try {
        const res = await mutate(
          RequestQueryKeys.addPayments,
          paymentsFetchers.addPayments(body),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getPayments);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },

    deletePayment: async (
      id: string,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.deletePayments,
          paymentsFetchers.deletePayments(id),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getPayments);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },
  };
};

export default usePayments;
