import { Box, SimpleGrid } from "@mantine/core";
import React from "react";

import StatsGrid from "./cards/StatsGrid";
import NivoChart from "./nivoChartBottom/NivoChart";
import RoundChart from "./roundChart/RoundChart";

function Statistica() {
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
        <RoundChart />
        <RoundChart />
        <RoundChart />
      </SimpleGrid>
      <NivoChart />
    </div>
  );
}

export default Statistica;
