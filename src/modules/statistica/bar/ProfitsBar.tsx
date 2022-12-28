import { formatedTime } from "@components/FormattedLocalTime/FormattedLocalTime";
import { Box, Skeleton } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ResponsiveBar } from "@nivo/bar";
import useStatistics from "@services/hooks/useStatistics";
import { floorLastThreeDigits } from "@utils";

import config from "./config";

const createSevenDaysStructure = (data: { date: string; value: number }[]) => {
  const getNum = (num: number) =>
    typeof num === "number" ? floorLastThreeDigits(num) : num;

  const res = data.map((day) => {
    const sizes = {
      sm: 0,
      md: 0,
      lg: 0,
      xl: 0,
      xs: 0,
    };

    if (day.value > 100000) {
      sizes.sm = day.value;
    } else if (day.value > 250000) {
      sizes.lg = day.value;
    } else if (day.value > 500000) {
      sizes.md = day.value;
    } else if (day.value > 1000000) {
      sizes.xl = day.value;
    } else {
      sizes.xs = day.value;
    }

    return {
      ...sizes,

      foyda: getNum(day?.value),
      kun: formatedTime(day.date),
    };
  });

  return res;
};

const ProfitsBar = ({
  activeShopId,
  isAllTrue,
}: {
  activeShopId: string;
  isAllTrue: boolean;
}) => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const { useFetchProfitBar } = useStatistics(activeShopId);
  const profitsBarQuery = useFetchProfitBar(isAllTrue);

  const { data: profitData, error } = profitsBarQuery;

  if (!profitData) return <Skeleton height={"50vh"} />;
  if (error) return <>Error</>;

  const props = {
    ...config,
    height: isMobile ? 900 : 400,
  };

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
        {...props}
        margin={{ top: 20, right: 30, bottom: 70, left: isMobile ? 40 : 10 }}
        layout={isMobile ? "horizontal" : "vertical"}
        tooltip={({ id, value, color, label }) => {
          return (
            <div
              style={{
                padding: 12,
                color,
                background: "#222222",
              }}
            >
              <span>Sana: {formatedTime(label, "LL")}</span>
              <br />
              <strong>
                {typeof id === "string" ? id.toUpperCase() : id}: {value}
              </strong>
            </div>
          );
        }}
        axisBottom={
          !isMobile
            ? {
                format: (value: string) => formatedTime(value, "DD"),
              }
            : null
        }
        axisLeft={
          isMobile
            ? {
                format: (value: string) => formatedTime(value, "DD"),
              }
            : null
        }
      />
    </Box>
  );
};

export default ProfitsBar;
