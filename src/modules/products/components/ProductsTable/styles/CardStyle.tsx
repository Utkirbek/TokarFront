import { createStyles } from "@mantine/core";

const useSalesCardStyles = createStyles(() => {
  return {
    prodactPaper: {
      width: "200px",
      padding: "8px",
      position: "relative",
      [`@media (max-width: 470px)`]: {
        width: "170px",
      },
      [`@media (max-width: 400px)`]: {
        width: "160px",
      },
      [`@media (max-width: 380px)`]: {
        width: "320px",
      },
    },
    prdactPostion: {
      position: "absolute",
      top: "0",
      right: "5px",
    },
    userText: {
      textAlign: "center",
      margin: "auto",
      fontSize: "16px",
      [`@media (max-width: 470px)`]: {
        fontSize: "13px",
      },
      [`@media (max-width: 380px)`]: {
        fontSize: "16px",
        margin: "auto",
        textAlign: "center",
      },
    },
    prodactFlex: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      gap: "10px",
      marginTop: "5px",
      marginBottom: "5px",
      [`@media (max-width: 710px)`]: {
        justifyContent: "space-around",
      },
      [`@media (max-width: 550px)`]: {
        justifyContent: "space-between",
      },
      [`@media (max-width: 380px)`]: {
        justifyContent: "center",
      },
    },
  };
});
export default useSalesCardStyles;
