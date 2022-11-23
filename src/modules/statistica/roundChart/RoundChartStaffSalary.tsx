import { Box } from "@mantine/core";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: -3000,
    pv: 1398000,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: -2000,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: -1890,
    pv: 4800,
    amt: 2181,
  },
];

export default function RoundChartStaffSalary({ sitatisticStaffSalary }: any) {
  const Data = [];
  const propData = sitatisticStaffSalary;
  for (let i: number = 0; i < propData.length; i++) {
    let d: any = {
      name: propData?.[i]?.name,
      uv: propData?.[i]?.value,
      pv: propData?.[i]?.null,
      amt: data?.[i]?.name,
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
          <BarChart
            width={420}
            height={260}
            data={Data}
            stackOffset="sign"
            margin={{
              top: 5,
              right: 30,
              left: 5,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 " />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <ReferenceLine y={0} stroke="#000" />
            <Bar dataKey="pv" fill="hsl(45, 70%, 50%)" />
            <Bar dataKey="uv" fill="hsl(170, 70%, 50%)" />
          </BarChart>

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
