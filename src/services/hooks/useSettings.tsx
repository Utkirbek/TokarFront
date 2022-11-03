import settingsFetchers from "@services/api/settingsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const useSettings = () => {
  const { mutate } = useSWRConfig();

  return {
    useGetAllPermissions: () => {
      return useSWR(
        [RequestQueryKeys.getAllPermissions],
        settingsFetchers.getAllPermissions
      );
    },
    useGetAllRoles: () => {
      return useSWR(
        [RequestQueryKeys.getAllRoles],
        settingsFetchers.getAllRoles
      );
    },
    addRole: (newRole: { name: string; permissions: any[] }) => {
      return mutate(
        [RequestQueryKeys.addRole],
        settingsFetchers.addRole(newRole.name, newRole.permissions),
        {
          revalidate: true,
        }
      );
    },

    updateRole: (updatedRole: {
      name: string;
      permissions: any[];
      id: string;
    }) => {
      return mutate(
        [RequestQueryKeys.updateRole],
        settingsFetchers.updateRole(
          updatedRole.id,
          updatedRole.name,
          updatedRole.permissions
        ),
        {
          revalidate: true,
        }
      );
    },

    deleteRole: async (id: string) => {
      return await mutate(
        [RequestQueryKeys.deleteRole],
        settingsFetchers.deleteRole(id),
        {
          revalidate: true,
        }
      );
    },

    addPermission: async (newPermission: { name: string }) => {
      return await mutate(
        [RequestQueryKeys.addPermission],
        settingsFetchers.addPermission(newPermission.name)
      );
    },

    updatePermission: async (updatedPermission: {
      name: string | any;
      id: string | any;
    }) => {
      return await mutate(
        [RequestQueryKeys.updatePermission],
        settingsFetchers.updatePermission(
          updatedPermission.id,
          updatedPermission.name
        ),
        {
          revalidate: true,
        }
      );
    },

    deletePermission: async (
      id: string,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.deletePermission,
          settingsFetchers.deletePermission(id),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getAllPermissions);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },
  };
};

export default useSettings;
