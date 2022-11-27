import { createStyles } from "@mantine/core";

const useSalesCardStyles = createStyles(() => {
  return {
    card: {
      width: "195px",
      height: "200px",
      padding: "2px",
      borderRadius: "7px",
      border: "1px solid #444",
      background: "linear-gradient(180deg,#2196f3, transparent) #3f51b5",
      cursor: "pointer",
    },
    active: {
      background: "linear-gradient(0deg, #E8590C 0%, rgba(45,112,253,1) 100%)",
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
