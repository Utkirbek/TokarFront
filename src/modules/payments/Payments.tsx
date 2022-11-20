import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import PaymentsTable from "@modules/payments/components/PaymentsTable";
import usePayments from "@services/hooks/usePayments";
import { Permissions } from "@utils/constants";

const Payments = () => {
  const { useFetchPayments } = usePayments();
  const getPaymentsQuery = useFetchPayments();
  const { data: payments } = getPaymentsQuery;

  return (
    <If hasPerm={Permissions.payments.view}>
      <WithLoading query={getPaymentsQuery}>
        <PaymentsTable data={payments} />
      </WithLoading>
    </If>
  );
};
export default Payments;
