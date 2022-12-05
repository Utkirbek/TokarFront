import { Box, ColorInput } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";
import React from "react";

class BarChart extends React.Component<any> {
  constructor(props: { sitatisticStaffSalary: any }) {
    super(props);
  }
  render() {
    const Data = [];
    const propData = this.props.sitatisticStaffSalary;
    for (let i: number = 0; i < propData.length; i++) {
      let d: any = {
        ranking: propData?.[i]?.name,
        value: propData?.[i]?.value,
      };
      Data.push(d);
    }

    return (
      <Box
        style={{
          width: "100%",
          height: "200px",
          margin: "25px 0",
        }}>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          })}>
          <div className="chart">
            <ResponsiveBar
              data={Data}
              keys={["value"]}
              indexBy="ranking"
              margin={{
                top: 20,
                right: 0,
                bottom: 50,
                left: 60,
              }}
              padding={0.6}
              groupMode="grouped"
              colors="rgb(232, 168, 56)"
              axisTop={null}
              axisRight={null}
              enableGridX
              enableGridY
              enableLabel={false}
              axisBottom={{
                tickSize: 0,
                tickPadding: 20,
                tickRotation: 30,
              }}
              labelTextColor={"red"}
              defs={[
                {
                  id: "gradient",
                  type: "linearGradient",
                  colors: [{ color: "#000" }],
                },
              ]}
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

export default BarChart;
