import adminFetchers from "@services/api/adminFetchers";
import userFetcher from "@services/api/userFetcher";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const useUsers = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchUsers: () =>
      useSWR(RequestQueryKeys.getUsers, userFetcher.getUsers),
    addUser: async function (
      body: {
        name: string;
        phone: string;
        workplace: string;
        extra: string;
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) {
      try {
        const res = await mutate(
          RequestQueryKeys.addUsers,
          userFetcher.addUsers(body),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getUsers);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    editUser: async (
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
          RequestQueryKeys.updateUsers,
          userFetcher.updateUsers(data.id, data.values),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getUsers);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    deleteUsers: async (
      id: string,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.deleteUsers,
          userFetcher.deleteUsers(id),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getUsers);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },
  };
};

export default useUsers;
