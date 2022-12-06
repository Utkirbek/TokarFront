import WithLoading from "@hoc/WithLoading";
import { Box, SimpleGrid, Skeleton } from "@mantine/core";
import statisticFetchers from "@services/api/statisticFetchers";
import useSitatisticsIncome from "@services/hooks/useSitatisticsIncome";
import useSitatisticsSpend from "@services/hooks/useSitatisticsSpend";
import useSitatisticsStaffSalary from "@services/hooks/useSitatisticsStaffSalary";
import { RequestQueryKeys } from "@utils/constants";
import useSWR from "swr";

import StatsGrid from "./cards/StatsGrid";
import ProfitsBar from "./nivoChartBottom/NivoChart";
import RoundChartIncome from "./roundChart/RoundChartIncome";
import RoundChartSpend from "./roundChart/RoundChartSpend";
import RoundChartStaffSalary from "./roundChart/RoundChartStaffSalary";
import StatisticsHeadSkeleton from "./Skleton";

const Loader = () => {
  return (
    <Box my={10}>
      <Skeleton height="250px" width={"100%"} my={10} />
    </Box>
  );
};

function Statistica() {
  const { useFetchSitatistcsSpend } = useSitatisticsSpend();
  const sitatisticsSpendQuery = useFetchSitatistcsSpend();
  const { data: sitatisticSpend } = sitatisticsSpendQuery;

  const { useFetchSitatistcsIncome } = useSitatisticsIncome();
  const sitatisticsIncomeQuery = useFetchSitatistcsIncome();
  const { data: sitatisticIncome } = sitatisticsIncomeQuery;

  const { useFetchSitatistcsStaffSalary } = useSitatisticsStaffSalary();
  const sitatisticsStaffSalaryQuery = useFetchSitatistcsStaffSalary();
  const { data: sitatisticStaffSalary } = sitatisticsStaffSalaryQuery;

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
        spacing="sm"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "sm" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}>
        <WithLoading query={sitatisticsSpendQuery} FallbackLoadingUI={Loader}>
          <RoundChartSpend sitatisticSpend={sitatisticSpend} />
        </WithLoading>
        <WithLoading query={sitatisticsIncomeQuery} FallbackLoadingUI={Loader}>
          <RoundChartIncome sitatisticIncome={sitatisticIncome} />
        </WithLoading>
        <WithLoading
          query={sitatisticsStaffSalaryQuery}
          FallbackLoadingUI={Loader}>
          <RoundChartStaffSalary
            sitatisticStaffSalary={sitatisticStaffSalary}
          />
        </WithLoading>
      </SimpleGrid>
      <ProfitsBar />
    </div>
  );
}

export default Statistica;
