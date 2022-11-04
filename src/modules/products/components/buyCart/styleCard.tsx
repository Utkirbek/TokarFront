import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => {
  return {
    boxHead: {
      width: "100%",
      shadowOffset: {
        width: 0,
        height: 1,
      },
    },
    card: {
      width: "100%",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20",
      borderRadius: 10,
      marginBottom: "20px",
    },
    CardBox: {
      marginTop: "20px",
      width: "100%",
      height: "250px",
    },
    cardPrice: {
      width: "100%",
      height: "280px",
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
      gap: "15",
    },
    payCardTitle: {
      fontWeight: 600,
      margin: "5px 0",
      textAlign: "center",
    },
    cardSuma: {
      width: "60px",
      height: "60px",
      cursor: "pointer",
      textAlign: "center",
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
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
