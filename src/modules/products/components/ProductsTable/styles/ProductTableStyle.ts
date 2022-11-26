import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {},
  titleHead: {
    fontSize: "36px",
    marginBottom: "20px",
    fontWeight: 700,
    color: "#1971C2",
    textAlign: "center",
  },
  allDisplay: {
    width: "100%",
    minHeight: "75vh",
  },
  itemGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  imageBox: {
    width: "350px",
    height: "350px",
  },
  left: {
    width: "800px",
  },
  textStart: {
    textAlign: "start",
    width: "230px",
    fontSize: "23px",
  },
  boxHeader: {
    width: "800px",
  },
  boxFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
  },
  text: {
    fontSize: "23px",
  },
  leftIcon: {
    size: 380,
  },
}));

export default useStyles;
