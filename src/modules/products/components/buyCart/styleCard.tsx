import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => {
  return {
    boxHead: {
      position: "sticky",
      top: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexFlow: "column",
    },
    card: {
      width: "100%",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 5,
      marginBottom: "10px",
    },
    CardBox: {
      width: "100%",
    },
    cardPrice: {
      width: "100%",
      borderRadius: 10,
    },
    buyBtn: {
      width: "100%",
      height: "50px",
      marginTop: "10px",
      borderRadius: 10,
    },
    trash: {
      color: "red",
      cursor: "pointer",
    },
    boxGroupCountTrash: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "10px",
    },
    totalpriceGrup: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "5",
      marginBottom: "10px",
    },
    payMoney: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    payCardTitle: {
      fontSize: "14px",
      fontWeight: 600,
      textAlign: "center",
    },
    cardSuma: {
      cursor: "pointer",
      textAlign: "center",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },

    payCard: {
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid  #1971c2",
      borderRadius: 10,
      cursor: "pointer",
    },

    empty: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 22,
      fontWeight: 700,
      padding: "30%  0",
    },
    counter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    btnCount: {
      margin: "0  10px",
      padding: "0px 7px 5px 7px",
      fontWeight: 700,
      fontSize: 20,
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    },
    user: {
      marginTop: "20px 0",
    },
    cardMoney: {
      display: "flex",
      justifyContent: "space-between",
    },
  };
});
export default useStyles;
