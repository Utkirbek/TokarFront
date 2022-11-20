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
  batafsil: {
    borderBottom: "1px dashed #444",
  },
  textColorB: {
    color: "black",
    fontSize: "14px",
  },

  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "28px",
    borderTop: "1px dashed #444",
    borderBottom: "1px dashed #444",
    padding: "7px 0px",
    color: "black",
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
    margin: "10px 0px",
    borderBottom: "1px dashed #444",
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
    paddingBottom: "10px",
    paddingTop: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px dashed #444",
  },
  row: {
    borderBottom: "1px dashed #444",
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
