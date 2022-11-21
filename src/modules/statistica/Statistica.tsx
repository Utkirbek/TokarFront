import { SimpleGrid } from "@mantine/core";
import statisticFetchers from "@services/api/statisticFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import StatsGrid from "./cards/StatsGrid";
import NivoChart from "./nivoChartBottom/NivoChart";
import RoundChart from "./roundChart/RoundChart";
import StatisticsHeadSkeleton from "./Skleton";

function Statistica() {
  const statistic = useSWR(
    RequestQueryKeys.statistics,
    statisticFetchers.getStatistic
  );
  const { data } = statistic;
  if (!data) return <StatisticsHeadSkeleton />;
  return (
    <div>
      <StatsGrid cardData={data} />
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        <RoundChart />
        <RoundChart />
        <RoundChart />
      </SimpleGrid>
      <NivoChart />
    </div>
  );
}

export default Statistica;
