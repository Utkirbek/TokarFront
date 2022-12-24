import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import useKassa from "@services/hooks/useKassa";
import { Permissions } from "@utils/constants";
import { useState } from "react";

import KassaTable from "./KassaTable";

function Kassa() {
  const [page, setPage] = useState(1);
  const { useKassaFeatchers } = useKassa();
  const getKassa = useKassaFeatchers(page, {
    perPage: 10,
  });
  const { data } = getKassa;

  return (
    <If hasPerm={Permissions.kassa.view}>
      <WithLoading withRenderProps query={getKassa}>
        <KassaTable
          datakassa={data?.kassas}
          total={data?.totalPage}
          page={page}
          onPageChange={(page: number) => setPage(page)}
        />
      </WithLoading>
    </If>
  );
}

export default Kassa;
