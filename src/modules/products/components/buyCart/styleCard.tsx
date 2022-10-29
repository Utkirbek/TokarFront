import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => {
  return {
    boxHead: {
      position: "absolute",
      top: "10%",
      right: 10,
      width: "400px",
      height: "90vh",
      backgroundColor: "#1A1B1E ",
      shadowColor: "#000",
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
      margin: "20px  0",
    },
    CardBox: {
      width: "100%",
      height: "280px",
    },
    cardPrice: {
      width: "100%",
      height: "200px",
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
    info: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "15",
      margin: "15px 0",
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
      margin: "10px 0",
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
      marginTop: "15%",
      padding: "30%  0",
    },
    counter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
    },
    btnCount: {
      backgroundColor: "#25262B",
      border: "1px solid #1971C2",
      color: "#fff",
      padding: "3px  10px",
      margin: "0 5px ",
    },
  };
});
export default useStyles;
