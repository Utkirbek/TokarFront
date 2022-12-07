import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import { Box, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons";
import { floorLastThreeDigits } from "@utils";
import { FormattedMessage } from "react-intl";

import { infoData } from "./data";
import { useStyles } from "./Style";

function StatsGrid({ data }: any) {
  const { classes } = useStyles();

  const stats = Object.entries(data)?.map(
    ([key, stat]: [any, any], id: any) => {
      const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

      return (
        <Paper withBorder p="md" radius="md" key={id}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Group position="apart">
                <Text size="xs" color="dimmed" className={classes.title}>
                  {infoData[key as "admins"].title}
                </Text>
              </Group>
              <Group align="flex-end" spacing="xs" mt={25}>
                <Text className={classes.value}>
                  {floorLastThreeDigits(stat.total)}
                </Text>
                <Text
                  color={stat.diff > 0 ? "teal" : "red"}
                  size="sm"
                  weight={500}
                  className={classes.diff}
                >
                  <span>{floorLastThreeDigits(stat.diff)}%</span>
                  <DiffIcon size={16} stroke={1.5} />
                </Text>
              </Group>

              <TextEllipsis
                text={infoData[key as "admins"].decrtion}
                size="xs"
                color="dimmed"
                mt={7}
              />
            </Box>
            <Box>
              <lord-icon
                src={infoData[key as "admins"].icon3d}
                trigger="hover"
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                }}
              ></lord-icon>
            </Box>
          </Box>
        </Paper>
      );
    }
  );
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={4}
        breakpoints={[
          { maxWidth: "md", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
export default StatsGrid;
