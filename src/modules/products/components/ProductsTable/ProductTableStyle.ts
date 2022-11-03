import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  rowSelected: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
  titleHead: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "20px",
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
    width: "500px",
    height: "400px",
    borderRadius: 20,
  },
  info: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-around",
    gap: 20,
    width: "50%",
    height: "65vh",
    fontWeight: 500,
    fontSize: 18,
  },
  left: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 15,
  },
  reight: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    gap: 15,
  },

  title: {
    fontSize: "28px",
    fontWeight: 700,
    color: "#1971C2",
  },
}));

export default useStyles;
