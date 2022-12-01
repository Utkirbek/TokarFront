import loanFeatchers from "@services/api/loanFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useLoan = () => {
  return {
    useLoanFeatchers: (
      page = 1,
      options = {
        perPage: 10,
      }
    ) =>
      useSWR([RequestQueryKeys.loan, page], (_, page) =>
        loanFeatchers.getLoan(page, {
          perPage: options?.perPage,
        })
      ),
  };
};
export default useLoan;
