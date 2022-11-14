import WithLoading from "@hoc/WithLoading";
import DashLayout from "@modules/layout";
import loanFeatchers from "@services/api/loanFetchers";
import { RequestQueryKeys } from "@utils/constants";
import React from "react";
import useSWR from "swr";

import LoanTable from "./LoanTable";

function Loan() {
  const loanData = useSWR(RequestQueryKeys.loan, loanFeatchers.getLoan);
  const { data } = loanData;
  return (
    <WithLoading withRenderProps query={loanData}>
      <LoanTable />
    </WithLoading>
  );
}
export default Loan;
