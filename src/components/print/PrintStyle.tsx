import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  flexC: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  flexP: {
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: "25px",
  },

  textBorder: {
    borderBottom: "1.5px solid #000",
    marginBottom: "2px",
  },
  textColorB: {
    color: "black",
    fontSize: "14px",
  },
  titleH: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "28px",
    color: "black",
  },
  batafsil: {
    width: "100",
    height: "8px",
    borderTop: "1.5px solid #000",
    borderBottom: "1.5px solid #000",
  },
  titleHead: {
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "19px",
    fontSize: "16px",
    padding: "7px 0px",
    color: "black",
  },
  marWidth: {
    display: "flex",
    justifyContent: "space-between",
    margin: "2px 0px 10px 0px",
    borderBottom: "1.5px solid #444",
  },
  paragph: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: "150px",
    height: "150px",
    margin: "auto",
  },
  bottomText: {
    textAlign: "center",
    margin: "5px 0px",
    width: "100%",
    color: "black",
  },
  imageHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1.5px solid #444",
  },
  row: {
    borderBottom: "1.5px solid #444",
    padding: "7px 0px",
  },
  widt: {
    width: "90%",
    margin: "auto",
  },
  textColor: {
    color: "black",
    fontSize: "12px",
  },
}));

export default useStyles;
