import useNotification from "@hooks/useNotification";
import fetchers from "@services/api/fetchers";
import { RequestQueryKeys } from "@utils/constants";
import { useSWRConfig } from "swr";

const useImageUpload = () => {
  const { mutate } = useSWRConfig();
  const { showErrorNotification } = useNotification();

  return {
    uploadImage: async (
      formData: FormData,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.IMAGE_UPLOAD,
          fetchers.imageUpload(formData),
          false
        );
        options?.onSuccess && options.onSuccess(res);

        return res;
      } catch (error: any) {
        showErrorNotification(error?.message);
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
  };
};
export default useImageUpload;
