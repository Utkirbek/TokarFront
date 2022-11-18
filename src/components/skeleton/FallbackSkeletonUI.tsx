import { Box,Skeleton } from "@mantine/core";

function FallbackSkeletonUI() {
  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: "20px",
        }}
      >
        <Skeleton height={40} mt={6} width="19%" />
        <Skeleton height={40} mt={6} width="19%" />
        <Skeleton height={40} mt={6} width="19%" />
        <Skeleton height={40} mt={6} width="19%" />
        <Skeleton height={40} mt={6} width="19%" />
      </Box>
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      <Skeleton height={40} mb="xl" />
      <Skeleton style={{ marginTop: "-18px" }} height={3} mb="xl" />
      
    </Box>
  );
}

export default FallbackSkeletonUI;
