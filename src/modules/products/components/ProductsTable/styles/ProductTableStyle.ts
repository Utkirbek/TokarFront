import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {},
  allDisplay: {
    width: "100%",
    minHeight: "75vh",
  },
  itemGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    [`@media(max-width: 1200px)`]: {
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
    },
  },
  imageBox: {
    width: "380px",
    height: "350px",
    [`@media (max-width: 800px)`]: {
      width: 200,
      height: 200,
      display: "flex",
      justifyContent: "center",
    },
  },
  image: {
    width: "100%",
    objectFit: "cover",
  },
  iconImage: {
    width: "400px",
    height: "auto",
    objectFit: "cover",
    border: "5px solid #000",
    "@media (max-width: 600px)": {
      width: "250px",
      height: "auto",
    },
  },
  left: {
    width: "800px",
    padding: "50px",
    "@media (max-width: 600px)": {
      width: "300px",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
    },
  },
  textStart: {
    width: "250px",
    fontSize: "23px",
    "@media (max-width: 600px)": {
      fontSize: 12,
    },
    "@media (min-width: 600px)": {
      textAlign: "center",
    },
  },

  boxHeader: {
    width: "100%",
    "@media (min-width: 600px": {
      width: "60%",
      textAlign: "start",
    },
  },

  boxFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
  },

  text: {
    minWidth: 130,
    fontSize: "20px",
    "@media (max-width: 600px)": {
      fontSize: 12,
    },
  },

  discountTitle: {
    fontSize: "26px",
    marginTop: 10,
    fontWeight: 600,
    color: "#1971C2",
    "@media (max-width: 600px)": {
      textAlign: "start",
      fontSize: 16,
    },
  },
  table: {
    [`@media(max-width: 950px)`]: {
      display: "none",
    },
  },
  hide: {
    display: "none",
    [`@media(max-width:950px)`]: {
      display: "flex",
    },
  },
}));

export default useStyles;
