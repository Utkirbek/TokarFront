import { Box, Skeleton } from "@mantine/core";
import { ResponsiveBar } from "@nivo/bar";
import useStatistics from "@services/hooks/useStatistics";

import config from "./config";

const createSevenDaysStructure = (data: { date: string; value: number }[]) => {
  const forWeeks: {
    xafta: string;
    dushanba: number;
    dushanbaColor: string;
    seshanba: number;
    seshanbaColor: string;
    chorshanba: number;
    chorshanbaColor: string;
    payshanba: number;
    payshanbaColor: string;
    juma: number;
    jumaColor: string;
    shanba: number;
    shanbaColor: string;
    yakshanba: number;
    yakshanbaColor: string;
  }[] = [];

  data.length = 28;

  for (let i = 0; i < data.length; i += 7) {
    const week = data.slice(i, i + 7);
    const weekData = {
      xafta: `Hafta ${i / 7 + 1}`,
      dushanba: week[0].value,
      dushanbaColor: "hsl(350, 70%, 50%)",
      seshanba: week[1].value,
      seshanbaColor: "hsl(69, 70%, 50%)",
      chorshanba: week[2].value,
      chorshanbaColor: "hsl(67, 70%, 50%)",
      payshanba: week[3].value,
      payshanbaColor: "hsl(348, 70%, 50%)",
      juma: week[4].value,
      jumaColor: "hsl(8, 70%, 50%)",
      shanba: week[5].value,
      shanbaColor: "hsl(148, 70%, 50%)",
      yakshanba: week[6].value,
      yakshanbaColor: "hsl(35, 70%, 50%)",
    };

    forWeeks.push(weekData);
  }

  return forWeeks;
};

const ProfitsBar = () => {
  const { useFetchProfitBar } = useStatistics();
  const profitsBarQuery = useFetchProfitBar();

  const { data: profitData, error } = profitsBarQuery;

  if (!profitData) return <Skeleton height={"50vh"} />;
  if (error) return <>Error</>;

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
        width: "100%",
        border: "1px solid #373a40",
      }}
    >
      <ResponsiveBar
        data={createSevenDaysStructure(profitData)}
        groupMode="grouped"
        keys={config.keys}
        indexBy="xafta"
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
          return e.id + ": " + e.formattedValue + " Kunlarda: " + e.indexValue;
        }}
      />
    </Box>
  );
};

export default ProfitsBar;
