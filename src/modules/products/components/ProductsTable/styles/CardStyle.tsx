import { createStyles } from "@mantine/core";

const useSalesCardStyles = createStyles(() => {
  return {
    prodactPaper: {
      width: "100%",
      padding: "8px",
      position: "relative",
    },
    trash: {
      position: "absolute",
      top: "0.3rem",
      right: ".5rem",
      cursor: "pointer",
      color: "red",
      height: "1.6rem",
      width: "1.6rem",
    },
    pencil: {
      position: "absolute",
      top: "0.3rem",
      left: ".5rem",
      cursor: "pointer",
      height: "1.6rem",
      width: "1.6rem",
    },
    userText: {
      textAlign: "center",
      margin: "auto",
      fontSize: "16px",
    },
    prodactFlex: {
      display: "grid",
      gridTemplateColumns: "auto auto auto",
      gap: "1rem",
      [`@media (max-width: 600px)`]: {
        gridTemplateColumns: "auto auto",
      },
      [`@media (max-width: 400px)`]: {
        gridTemplateColumns: "auto auto ",
        marginLeft: ".4rem",
      },
      [`@media (max-width: 370px)`]: {
        gridTemplateColumns: "auto",
      },
    },
  };
});
export default useSalesCardStyles;
