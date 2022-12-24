import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import useLoan from "@services/hooks/useLoan";
import { Permissions } from "@utils/constants";
import { useState } from "react";

import LoanTable from "./LoanTable";

function Loan() {
  const [page, setPage] = useState(1);
  const { useLoanFeatchers } = useLoan();
  const loanData = useLoanFeatchers(page, {
    perPage: 10,
  });
  const { data } = loanData;

  return (
    <If hasPerm={Permissions.loans.view}>
      <WithLoading withRenderProps query={loanData}>
        <LoanTable
          dataloan={data?.loans}
          total={data?.totalPage}
          page={page}
          onPageChange={(page: number) => setPage(page)}
        />
      </WithLoading>
    </If>
  );
}
export default Loan;
