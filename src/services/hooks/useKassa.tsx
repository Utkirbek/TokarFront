import kassaFetcher from "@services/api/kassaFetcher";
import loanFeatchers from "@services/api/loanFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const useKassa = () => {
  return {
    useKassaFeatchers: (
      page = 1,
      options = {
        perPage: 10,
      }
    ) =>
      useSWR([RequestQueryKeys.getKassa, page], (_, page) =>
        kassaFetcher.getKassa(page, {
          perPage: options?.perPage,
        })
      ),
  };
};
export default useKassa;
