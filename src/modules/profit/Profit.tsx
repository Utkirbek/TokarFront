import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import ProfitTable from "@modules/profit/ProfitTable";
import useProfit from "@services/hooks/useProfit";
import { Permissions } from "@utils/constants";
import { useState } from "react";

const ProfitModule = () => {
  const [page, setPage] = useState(1);
  const { useProfitFeatchers } = useProfit();
  const getProfit = useProfitFeatchers(page, {
    perPage: 10,
  });

  const { data } = getProfit;

  if (getProfit.data?.length == undefined || getProfit.data?.length == 0)
    return <EmptyBox />;

  return (
    <If hasPerm={Permissions.profit.view}>
      <WithLoading withRenderProps query={getProfit}>
        <ProfitTable
          dataProfit={data?.Profits}
          total={data?.totalPage}
          page={page}
          onPageChange={(page: number) => setPage(page)}
        />
      </WithLoading>
    </If>
  );
};

export default ProfitModule;
