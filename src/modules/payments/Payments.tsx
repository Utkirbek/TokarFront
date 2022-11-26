import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import PaymentsTable from "@modules/payments/components/PaymentsTable";
import usePayments from "@services/hooks/usePayments";
import { Permissions } from "@utils/constants";
import { useState } from "react";

const Payments = () => {
  const [page, setPage] = useState(1);
  const { useFetchPayments } = usePayments();
  const getPaymentsQuery = useFetchPayments(page);
  const { data } = getPaymentsQuery;

  return (
    <If hasPerm={Permissions.payments.view}>
      <WithLoading query={getPaymentsQuery}>
        <PaymentsTable
          data={data?.payments}
          total={data?.totalPage}
          page={page}
          onPageChange={(page: number) => setPage(page)}
        />
      </WithLoading>
    </If>
  );
};
export default Payments;
