import WithLoading from "@hoc/WithLoading";
import { Box, SimpleGrid, Skeleton } from "@mantine/core";
import useSitatisticsIncome from "@services/hooks/useSitatisticsIncome";
import useSitatisticsSpend from "@services/hooks/useSitatisticsSpend";
import useSitatisticsStaffSalary from "@services/hooks/useSitatisticsStaffSalary";
import React from "react";

import StatsGrid from "./cards/StatsGrid";
import NivoChart from "./nivoChartBottom/NivoChart";
import RoundChartIncome from "./roundChart/RoundChartIncome";
import RoundChartSpend from "./roundChart/RoundChartSpend";
import RoundChartStaffSalary from "./roundChart/RoundChartStaffSalary";

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

  return (
    <div>
      <StatsGrid />
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
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
      <NivoChart />
    </div>
  );
}

export default Statistica;
