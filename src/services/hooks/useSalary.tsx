import salaryFetchers from "@services/api/salaryFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const useSalary = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchSalary: () =>
      useSWR(RequestQueryKeys.getSalary, () => salaryFetchers.getSalary),
    addSalary: async function (
      body: {
        amount: any;
        staff: any;
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) {
      try {
        const res = await mutate(
          RequestQueryKeys.addSalary,
          salaryFetchers.addSalary(body),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getSalary);
        mutate(RequestQueryKeys.getAdmins);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
  };
};

export default useSalary;
