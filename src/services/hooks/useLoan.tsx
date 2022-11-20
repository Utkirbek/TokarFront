import loanFeatchers from "@services/api/loanFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useLoan = () => {
  return {
    useLoanFeatchers: () =>
      useSWR(RequestQueryKeys.loan, loanFeatchers.getLoan),
  };
};
export default useLoan;
