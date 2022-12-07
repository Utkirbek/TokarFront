import { Grid, Skeleton } from "@mantine/core";

function StatisticsHeadSkeleton() {
  return (
    <Grid>
      <Grid.Col span={6} md={3}>
        <Skeleton height={140} radius="md" />
      </Grid.Col>
      <Grid.Col span={6} md={3}>
        <Skeleton height={140} radius="md" />
      </Grid.Col>
      <Grid.Col span={6} md={3}>
        <Skeleton height={140} radius="md" />
      </Grid.Col>
      <Grid.Col span={6} md={3}>
        <Skeleton height={140} radius="md" />
      </Grid.Col>
    </Grid>
  );
}

export default StatisticsHeadSkeleton;
