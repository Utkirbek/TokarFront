import WithLoading from "@hoc/WithLoading";
import { SimpleGrid, Skeleton } from "@mantine/core";
import useStatistics from "@services/hooks/useStatistics";

import ProfitsBar from "./bar/ProfitsBar";
import StatsGrid from "./cards/StatsGrid";
import PieChart from "./PieChart/PieChart";
import StatisticsHeadSkeleton from "./Skleton";

function Statistics() {
  const { useFetchStats, useFetchStaffSalary, useFetchSpent, useFetchIncome } =
    useStatistics();

  const statsQuery = useFetchStats();
  const staffSalaryQuery = useFetchStaffSalary();
  const spentQuery = useFetchSpent();
  const incomeQuery = useFetchIncome();

  const { data: statsData } = statsQuery;
  const { data: staffSalaryData } = staffSalaryQuery;
  const { data: spentData } = spentQuery;
  const { data: incomeData } = incomeQuery;

  return (
    <div>
      <WithLoading
        withRenderProps
        query={statsQuery}
        FallbackLoadingUI={StatisticsHeadSkeleton}
      >
        <StatsGrid data={statsData} />
      </WithLoading>
      <SimpleGrid
        cols={3}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 2, spacing: "sm" },
          { maxWidth: 755, cols: 1, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        <WithLoading
          query={incomeQuery}
          FallbackLoadingUI={() => <Skeleton height={"35vh"} my={16} />}
        >
          <PieChart data={incomeData?.weeks} labelId="income" />
        </WithLoading>
        <WithLoading
          query={spentQuery}
          FallbackLoadingUI={() => <Skeleton height={"35vh"} my={16} />}
        >
          <PieChart data={spentData?.weeks} labelId="spent" />
        </WithLoading>
        <WithLoading
          withRenderProps
          query={staffSalaryQuery}
          FallbackLoadingUI={() => <Skeleton height={"35vh"} my={16} />}
        >
          <PieChart data={staffSalaryData} labelId="staffSalary" />
        </WithLoading>
      </SimpleGrid>
      <ProfitsBar />
    </div>
  );
}

export default Statistics;
