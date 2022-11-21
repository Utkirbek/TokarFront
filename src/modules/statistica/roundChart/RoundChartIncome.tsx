import { Box } from "@mantine/core";
import { ResponsivePie } from "@nivo/pie";
import React from "react";

import config from "./config";
import data from "./data";

class RoundChartIncome extends React.Component<any> {
  constructor(props: { sitatisticIncome: any }) {
    super(props);
  }

  render() {
    const Data = [];
    const propData = this.props?.sitatisticIncome?.weeks;
    for (let i: number = 0; i <= 3; i++) {
      let d: any = {
        id: propData?.[i]?.name,
        label: propData?.[i]?.name,
        value: propData?.[i]?.value,
        color: data?.[i]?.color,
      };
      Data.push(d);
    }

    return (
      <Box
        style={{
          margin: "25px 0px",
        }}>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          })}>
          <div className="chart">
            <ResponsivePie
              data={Data}
              margin={config.margin}
              innerRadius={0.4}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsThickness={3}
              arcLinkLabelsColor={{ from: "color" }}
              arcLabelsSkipAngle={10}
              defs={config.defs}
              fill={config.fill}
              legends={config.legends}
              arcLinkLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 1.2]],
              }}
            />

            <style jsx>
              {`
                .chart {
                  height: 35vh;
                  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                  transition: 0.3s;
                  border-radius: 8px;
                  // margin: 25px auto;
                  border: 1px solid #373a40;
                }
                .chart:hover {
                  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
                }
              `}
            </style>
          </div>
        </Box>
      </Box>
    );
  }
}
export default RoundChartIncome;
