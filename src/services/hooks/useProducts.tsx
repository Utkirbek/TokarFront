import productFetchers from "@services/api/productFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const useProducts = () => {
  const { mutate } = useSWRConfig();

  return {
    useFetchProduct: (
      page = 1,
      options = {
        perPage: 10,
        minQuantity: false,
        noPrice: false,
      }
    ) =>
      useSWR(
        [
          RequestQueryKeys.getProducts,
          page,
          options?.minQuantity,
          options?.noPrice,
        ],
        (_, page, minQuantity, noPrice) =>
          productFetchers.getProducts(page, {
            perPage: options?.perPage,
            minQuantity,
            noPrice,
          })
      ),
    addProduct: async (
      body: {
        title: string;
        image: string;
        code: string | Number;
        price: string | Number;
        unit: string | Number;
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
        mutate([RequestQueryKeys.getProducts, 1, false, false]);
        options?.onSuccess && options.onSuccess(res);
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
        mutate([RequestQueryKeys.getProducts, 1, false, false]);
        options?.onSuccess && options.onSuccess(res);
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
        mutate([RequestQueryKeys.getProducts, 1, false, false]);
        options?.onSuccess && options.onSuccess(res);
        return res;
      } catch (err) {
        console.error(err);
        options?.onError && options.onError(err);
      }
    },
  };
};

export default useProducts;
