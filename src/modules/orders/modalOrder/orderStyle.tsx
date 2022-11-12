import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => {
  return {
    titleHead: {
      textAlign: "center",
      fontSize: "36px",
      marginBottom: "30px",
      fontWeight: 700,
      color: "#1971C2",
    },
    itemGroup: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    imageBox: {
      width: "200px",
      marginLeft: "90px",
      height: "220px",
    },
    boxColumn: {
      display: "flex",
      flexDirection: "column",
    },
    info: {
      display: "flex",
      alignContent: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      height: "350px",
      fontWeight: 500,
      fontSize: 18,
      marginTop: "40px",
      gap: 20,
    },
    left: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: 15,
    },
    right: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      gap: 15,
      marginLeft: "10px",
    },

    title: {
      fontSize: "28px",
      fontWeight: 700,
      color: "#1971C2",
    },

    productImage: {
      width: "300px",
      height: "300px",
      borderRadius: "12px",
    },
    productCart: {
      width: "300px",
      height: "600px",
      borderRadius: "12px",
      boxShadow: "0 0 20px 0 black",
    },
    productFlex: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
    },
  };
});

export default useStyles;
