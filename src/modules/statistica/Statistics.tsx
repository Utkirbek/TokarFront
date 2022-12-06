import WithLoading from "@hoc/WithLoading";
import { SimpleGrid } from "@mantine/core";
import statisticsFetchers from "@services/api/statisticsFetchers";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import StatsGrid from "./cards/StatsGrid";
import ProfitsBar from "./nivoChartBottom/ProfitsBar";
import RoundChart from "./roundChart/RoundChart";
import StatisticsHeadSkeleton from "./Skleton";

function Statistics() {
  const statisticInfoQuery = useSWR(
    RequestQueryKeys.statistics,
    statisticsFetchers.getStatistics
  );

  const { data } = statisticInfoQuery;

  return (
    <div>
      <WithLoading
        withRenderProps
        query={statisticInfoQuery}
        FallbackLoadingUI={StatisticsHeadSkeleton}
      >
        <StatsGrid data={data} />
      </WithLoading>
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
      <ProfitsBar />
    </div>
  );
}

export default Statistics;
