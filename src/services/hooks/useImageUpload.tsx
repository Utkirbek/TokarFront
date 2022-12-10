import fetchers from "@services/api/fetchers";
import { RequestQueryKeys } from "@utils/constants";
import { useSWRConfig } from "swr";

const useImageUpload = () => {
  const { mutate } = useSWRConfig();

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
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
  };
};
export default useImageUpload;
