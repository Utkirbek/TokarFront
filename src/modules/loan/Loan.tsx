import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import DashLayout from "@modules/layout";
import loanFeatchers from "@services/api/loanFetchers";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import React from "react";
import useSWR from "swr";

import LoanTable from "./LoanTable";

function Loan() {
  const loanData = useSWR(RequestQueryKeys.loan, loanFeatchers.getLoan);
  const { data } = loanData;
  return (
    <If hasPerm={Permissions.loans.view}>
      <WithLoading withRenderProps query={loanData}>
        <LoanTable />
      </WithLoading>
    </If>
  );
}
export default Loan;
