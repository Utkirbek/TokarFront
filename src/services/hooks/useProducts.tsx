import productFetchers from "@services/api/productFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const useProducts = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchProduct: (page = 1) =>
      useSWR([RequestQueryKeys.getProducts, page], (_, page) =>
        productFetchers.getProducts(page)
      ),
    addProduct: async (
      body: {
        title: string;
        image: string;
        code: string | Number;
        price: string | Number;
        quantity: string | Number;
        description: string;
        discounts: any;
      },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.addProduct,
          productFetchers.addProduct(body),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getProducts);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    editProduct: async (
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
          RequestQueryKeys.updateProducts,
          productFetchers.updateProducts(data.id, data.values),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getProducts);
        return res;
      } catch (error) {
        console.error(error);
        options?.onError && options.onError(error);
      }
    },
    deleteProducts: async (
      id: string,
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
      }
    ) => {
      try {
        const res = await mutate(
          RequestQueryKeys.deleteProducts,
          productFetchers.deleteProduct(id),
          {
            revalidate: true,
          }
        );
        options?.onSuccess && options.onSuccess(res);
        mutate(RequestQueryKeys.getProducts);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },
  };
};

export default useProducts;
