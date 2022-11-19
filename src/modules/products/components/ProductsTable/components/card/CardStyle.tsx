import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => {
  return {
    card: {
      width: "180px",
      height: "200px",
      border: "1px solid #444",
      borderRadius: "7px",
    },
    cardPadding: {
      padding: "5px",
    },
    cardFlex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cardButton: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "5px",
    },
  };
});
export default useStyles;
