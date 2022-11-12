import loanFeatchers from "@services/api/loanFeatchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

const useLoan = () => {
  return {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useLoanFeatchers: () =>
      useSWR(RequestQueryKeys.loan, loanFeatchers.getLoan),
    useLoanUserFeatchers: () =>
      useSWR(RequestQueryKeys.getLoanUserID, loanFeatchers.getLoanUserID),
  };
};
export default useLoan;
