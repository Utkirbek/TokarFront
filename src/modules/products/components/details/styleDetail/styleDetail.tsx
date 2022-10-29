import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => {
  return {
    imageGroup: {
      display: "flex",
      justifyContent: "space-between",
    },

    imageSmallGroup: {
      width: "50%",
      height: "350px",
      margin: "20px  0",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 10,
    },
    imageBig: {
      width: "50%",
      height: "350px",
      border: "1px solid #fff",
    },
    imageSmall: {
      width: "40%",
      height: "150px",
      border: "1px solid #fff",
      margin: "20px  0",
    },
  };
});

export default useStyles;
