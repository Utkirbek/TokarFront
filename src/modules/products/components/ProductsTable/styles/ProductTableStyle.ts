import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {},
  titleHead: {
    fontSize: "36px",
    marginBottom: "20px",
    fontWeight: 600,
    color: "#1971C2",
    [`@media (max-width: 800px)`]: {
      fontSize: 18,
      marginBottom: 15,
    },
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
    flexWrap: "wrap",
  },
  imageBox: {
    width: "380px",
    height: "350px",
    [`@media (max-width: 800px)`]: {
      width: 200,
      height: 200,
    },
  },
  left: {
    width: "800px",
  },
  textStart: {
    textAlign: "start",
    width: "250px",
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 12,
    },
  },
  boxHeader: {
    width: "800px",
  },
  boxFlex: {
    minWidth: 300,
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
  },
  text: {
    minWidth: 130,
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 12,
    },
  },
  tex: {
    fontSize: 14,
    [`@media (max-width: 800px)`]: {
      fontSize: 12,
      marginLeft: 100,
      marginTop: 10,
    },
  },
  leftIcon: {
    size: 380,
  },
}));

export default useStyles;
