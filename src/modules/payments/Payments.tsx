import WithLoading from "@hoc/WithLoading";
import PaymentsTable from "@modules/payments/components/PaymentsTable";
import usePayments from "@services/hooks/usePayments";

const Payments = () => {
  const { useFetchPayments } = usePayments();
  const getPaymentsQuery = useFetchPayments();
  const { data: payments } = getPaymentsQuery;

  return (
    <WithLoading query={getPaymentsQuery}>
      <PaymentsTable data={payments} />
    </WithLoading>
  );
};
export default Payments;
