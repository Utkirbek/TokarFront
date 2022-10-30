import { Box, Group, Paper, SimpleGrid, Text } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons";

import { dataStas } from "./data";
import { useStyles } from "./Style";

function StatsGrid() {
  const { classes } = useStyles();
  const stats = dataStas.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Group position="apart">
              <Text size="xs" color="dimmed" className={classes.title}>
                {stat.title}
              </Text>
            </Group>

            <Group align="flex-end" spacing="xs" mt={25}>
              <Text className={classes.value}>{stat.value}</Text>
              <Text
                color={stat.diff > 0 ? "teal" : "red"}
                size="sm"
                weight={500}
                className={classes.diff}
              >
                <span>{stat.diff}%</span>
                <DiffIcon size={16} stroke={1.5} />
              </Text>
            </Group>

            <Text size="xs" color="dimmed" mt={7}>
              {stat.decrtion}
            </Text>
          </Box>
          <Box>
            <lord-icon
              src={stat.icon3d}
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
  });
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
