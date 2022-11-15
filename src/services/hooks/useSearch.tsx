import adminFetchers from "@services/api/adminFetchers";
import productFetchers from "@services/api/productFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSearch = () => {
  return {
    useSearchProduct: (title: string) =>
      useSWR([RequestQueryKeys.searchProduct, title], () =>
        productFetchers.getProductByTitle(title)
      ),
    useSearchAdmin: (title: string) =>
      useSWR([RequestQueryKeys.searchAdmins, title], () =>
        adminFetchers.getAdminsByTitle(title)
      ),
    useSearchUser: (title: string) =>
      useSWR([RequestQueryKeys.searchAdmins, title], () =>
        adminFetchers.getAdminsByTitle(title)
      ),
  };
};

export default useSearch;
