import { Box } from "@mantine/core";
import { Bar } from "@nivo/bar";
import React from "react";

class RoundChartStaffSalary extends React.Component<any> {
  constructor(props: { sitatisticStaffSalary: any }) {
    super(props);
  }

  render() {
    return (
      <Box
        style={{
          margin: "25px 0px",
          height: "100%",
        }}>
        <Box
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
          })}>
          <div className="chart">
            <Bar
              keys={this.props.sitatisticStaffSalary}
              padding={0.4}
              colors={["#97e3d5", "#61cdbb", "#f47560", "#e25c3b"]}
              valueFormat={(v) => `${v}%`}
              data={this.props.sitatisticStaffSalary}
              height={0}
              width={0}
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
export default RoundChartStaffSalary;
