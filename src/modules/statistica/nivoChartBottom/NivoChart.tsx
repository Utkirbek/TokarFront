import { Box } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";

import data from "../cards/data";
import config from "./config";

class NivoChart extends React.Component {
  render() {
    return (
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
        })}
        style={{
          height: "50vh",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
          borderRadius: "8px",
          border: "1px solid #373a40",
        }}
      >
        <ResponsiveBar
          data={data}
          groupMode="grouped"
          keys={config.keys}
          indexBy="country"
          margin={config.margin}
          padding={0}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={{ scheme: "nivo" }}
          defs={config.defs}
          fill={config.fill}
          borderColor={config.borderColor}
          axisTop={null}
          axisRight={null}
          axisBottom={config.axisBottom}
          axisLeft={config.axisLeft}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={config.labelTextColor}
          legends={config.legends}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            );
          }}
        />
      </Box>
    );
  }
}
export default NivoChart;
