import { formatedTime } from "@components/FormattedLocalTime/FormattedLocalTime";
import { Box, Text } from "@mantine/core";
import { ResponsivePie } from "@nivo/pie";
import { floorLastThreeDigits } from "@utils";
import React from "react";
import { FormattedMessage } from "react-intl";

import config from "./config";

export const getSchema = (
  data: {
    name: string;
    date: string;
    value: number;
  }[]
) => {
  const schema = [];

  for (let i: number = 0; i < data.length; i++) {
    let d = {
      id: `${i + 1}. ${data?.[i]?.name || formatedTime(data?.[i]?.date)}`,
      label: data?.[i]?.name || `${i + 1} - ${formatedTime(data?.[i]?.date)}`,
      value:
        typeof data?.[i]?.value === "number"
          ? floorLastThreeDigits(data?.[i]?.value)
          : data?.[i]?.value,
      color: config.colors[i],
    };
    schema.push(d);
  }

  return schema;
};

const PieChart: React.FC<{
  data: any;
  labelId: string;
}> = ({ data, labelId }) => {
  return (
    <Box my={16}>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[7]
              : theme.colors.gray[0],
          position: "relative",
        })}
      >
        <div className="chart">
          <Text
            sx={{
              position: "absolute",
              top: 5,
              left: 10,
            }}
          >
            <FormattedMessage id={labelId} defaultMessage={"Kirim"} />
          </Text>
          <ResponsivePie
            data={getSchema(data)}
            margin={config.margin}
            innerRadius={0.4}
            padAngle={3}
            cornerRadius={8}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            arcLinkLabelsSkipAngle={10}
            arcLinkLabelsThickness={3}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            legends={config.legends}
            arcLinkLabelsTextColor={{
              from: "color",
              modifiers: [["darker", 0.5]],
            }}
          />

          <style jsx>
            {`
              .chart {
                height: 35vh;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                transition: 0.3s;
                border-radius: 8px;
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
};

export default PieChart;
