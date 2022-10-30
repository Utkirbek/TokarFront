import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => {
  return {
    boxHead: {
      position: "absolute",
      top: "10%",
      right: 10,
      width: "400px",
      height: "90vh",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
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
      boxShadow: "2px 0 0  3px rgba(0, 0, 0, 0.2)",
    },
    CardBox: {
      marginTop: "50px",
      width: "100%",
      height: "250px",
    },
    cardPrice: {
      width: "100%",
      height: "280px",
      borderRadius: 10,
      boxShadow: "2px 0 0  3px rgba(0, 0, 0, 0.2)",
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
      textAlign: "center",
      fontWeight: 700,
      margin: "5px 0",
    },

    payCard: {
      width: "100px",
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
      margin: "0  5px",
    },
  };
});
export default useStyles;
