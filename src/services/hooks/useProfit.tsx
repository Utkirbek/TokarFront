import profitFetcher from "@services/api/profitFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useProfit = () => {
  return {
    useProfitFeatchers: (
      page = 1,
      options = {
        perPage: 10,
      }
    ) =>
      useSWR([RequestQueryKeys.getKassa, page], (_, page) =>
        profitFetcher.getProfit(page, {
          perPage: options?.perPage,
        })
      ),
  };
};
export default useProfit;
