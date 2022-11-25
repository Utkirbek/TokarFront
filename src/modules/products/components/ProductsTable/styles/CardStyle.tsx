import { createStyles } from "@mantine/core";

const useSalesCardStyles = createStyles(() => {
  return {
    card: {
      width: "100%",
      height: "100%",
      border: "1px solid #444",
      borderRadius: "7px",
    },
    cardPadding: {
      padding: "5px",
    },
    cardButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "5px",
    },
  };
});
export default useSalesCardStyles;
