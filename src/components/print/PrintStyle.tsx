import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  head: {
    borderBottom: "1px dashed #444",
    padding: "2px 0px",
  },
  flexC: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "30px",
    borderTop: "1px dashed #444",
    borderBottom: "1px dashed #444",
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
    fontSize: "22px",
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
    borderTop: "1px dashed #444",
    width: "100%",
    color: "black",
  },
  imageHead: {
    borderBottom: "1px dashed #444",
    paddingBottom: "20px",
    borderTop: "1px dashed #444",
    paddingTop: "20px",
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
    fontSize: "10px",
  },
}));

export default useStyles;
