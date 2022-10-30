import productFetchers from "@services/api/productFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useSearch = () => {
  return {
    useSearchProduct: (title: string) =>
      useSWR([RequestQueryKeys.searchProduct, title], () =>
        productFetchers.getProductByTitle(title)
      ),
  };
};

export default useSearch;
