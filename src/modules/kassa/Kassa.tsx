import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import DashLayout from "@modules/layout";
import kassaFetcher from "@services/api/kassaFetcher";
import { Permissions, RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import KassaTable from "./KassaTable";

function Kassa() {
  const getKassa = useSWR(RequestQueryKeys.getKassa, kassaFetcher.getKassa);

  return (
    <DashLayout>
      <If hasPerm={Permissions.kassa.view}>
        <WithLoading withRenderProps query={getKassa}>
          <KassaTable />
        </WithLoading>
      </If>
    </DashLayout>
  );
}

export default Kassa;
