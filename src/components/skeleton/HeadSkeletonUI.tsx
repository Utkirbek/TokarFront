import { Box, Skeleton } from "@mantine/core";

function HeadSkeletonUI() {
  return (
    <Box
      style={{
        margin: "20px auto",
        width: "35%",
      }}
    >
      <Skeleton height={25} />
      <Skeleton height={15} mt={15} />
      <Skeleton height={30} mt={15} />
      <Skeleton height={30} mt={15} width="100px" style={{ float: "right" }} />
    </Box>
  );
}

export default HeadSkeletonUI;
