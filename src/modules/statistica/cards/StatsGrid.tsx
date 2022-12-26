import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import { Box, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons";
import { floorLastThreeDigits } from "@utils";

import { infoData } from "./data";
import { useStyles } from "./Style";

function StatsGrid({ data }: any) {
  const { classes } = useStyles();

  const stats = Object.entries(data)?.map(
    ([key, stat]: [any, any], id: any) => {
      const DiffIcon = IconArrowUpRight;

      return (
        <Paper withBorder p="sm" radius="md" key={id}>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Group position="apart">
                <Text size="xs" color="dimmed" className={classes.title}>
                  {infoData[key as "admins"]?.title}
                </Text>
              </Group>
              <Group align="flex-end" spacing="xs" mt={25}>
                <Text className={classes.value}>
                  {floorLastThreeDigits(stat.total)}
                </Text>
                <Text
                  color={"teal"}
                  size="sm"
                  weight={500}
                  className={classes.diff}
                >
                  <span>{floorLastThreeDigits(10)}%</span>
                  <DiffIcon size={16} stroke={1.5} />
                </Text>
              </Group>

              <TextEllipsis
                text={infoData[key as "admins"]?.decrtion}
                size="xs"
                color="dimmed"
                mt={7}
              />
            </Box>
            <Box>
              <lord-icon
                src={infoData[key as "admins"]?.icon3d}
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
        cols={5}
        breakpoints={[
          { maxWidth: "lg", cols: 4 },
          { maxWidth: "md", cols: 3 },
          { maxWidth: "sm", cols: 2 },
          { maxWidth: "xs", cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}
export default StatsGrid;
