import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import kassaFetcher from "@services/api/kassaFetcher";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import { useState } from "react";
import useSWR from "swr";

import KassaTable from "./KassaTable";

function Kassa() {
  const [page, setPage] = useState(1);
  const getKassa = useSWR(RequestQueryKeys.getKassa, kassaFetcher.getKassa);
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
