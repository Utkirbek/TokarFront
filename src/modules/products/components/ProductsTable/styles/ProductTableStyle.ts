import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {},
  ordersD: {
    width: "100%",
    minHeight: "75vh",
    position: "relative",
    [`@media (max-width: 800px)`]: {
      height: "90vh",
    },
  },
  modalOrders: {
    width: "100%",
    display: "none",
    position: "absolute",
    bottom: "0",
    [`@media (max-width: 800px)`]: {
      display: "block",
    },
  },
  allDisplay: {
    width: "100%",
    minHeight: "75vh",
    position: "relative",
    [`@media (max-width: 800px)`]: {
      height: "90vh",
    },
  },
  table: {
    [`@media (max-width: 900px)`]: {
      display: "none",
    },
  },
  itemGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [`@media(max-width: 1050px)`]: {
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
  titleHead: {
    fontSize: "36px",
    marginBottom: "20px",
    fontWeight: 600,
    color: "#1971C2",
    "@media (max-width: 800px)": {
      fontSize: 18,
      marginBottom: 15,
    },
    "@media (max-width: 1200px)": {
      textAlign: "center",
      fontSize: 25,
    },
  },
  iconPhoto: {
    width: "380px",
    height: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [`@media (max-width: 800px)`]: {
      width: "200px",
      height: "200px",
    },
  },
  imageBox: {
    width: "380px",
    height: "350px",
    [`@media (max-width: 800px)`]: {
      width: "200px",
      height: "200px",
      display: "flex",
      justifyContent: "center",
    },
  },
  image: {
    width: "100%",
    objectFit: "cover",
  },
  iconImage: {
    width: "380px",
    height: "auto",
    objectFit: "cover",
    "@media (max-width: 600px)": {
      width: "200px",
      height: "auto",
    },
  },
  left: {
    padding: "10px 50px",
    width: "100%",
    ["@media (max-width: 600px)"]: {
      display: "flex",
      padding: "0px",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
  },
  textStart: {
    fontSize: "23px",
    ["@media (max-width: 600px)"]: {
      fontSize: 15,
    },
    ["@media (max-width: 1200px)"]: {
      fontSize: 17,
    },
  },

  boxHeader: {
    width: "100%",
  },

  boxFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
  },

  text: {
    fontSize: "20px",
    ["@media (max-width: 800px)"]: {
      fontSize: 15,
    },
    ["@media (max-width: 120px)"]: {
      fontSize: 17,
    },
  },
  discount: {
    padding: "50px",
    ["@media (max-width: 800px)"]: {
      padding: "0px",
    },
  },

  discountTitle: {
    fontSize: "26px",
    marginTop: 10,
    fontWeight: 600,
    color: "#1971C2",
    ["@media (max-width: 800px)"]: {
      textAlign: "start",
      fontSize: 16,
    },
  },
  hide: {
    display: "none",
    [`@media(max-width:950px)`]: {
      display: "flex",
    },
  },
  modalBtn: {
    width: "100%",
    display: "none",
    position: "absolute",
    bottom: "0",
    [`@media (max-width: 800px)`]: {
      display: "block",
    },
  },
}));

export default useStyles;
