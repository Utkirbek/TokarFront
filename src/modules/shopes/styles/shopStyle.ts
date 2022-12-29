import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  Skeleton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 20,
    [`@media (max-width: 900px)`]: {
      justifyContent: "center",
    },
  },
  box: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
    gap: "15px",
    [`@media (max-width: 900px)`]: {
      justifyContent: "center",
      marginBottom: "40px",
      gap: "5px",
    },
  },
  Cart: {
    padding: "12px",
    width: "300px",
    height: "300px",
    margin: "20px",
    borderRadius: "8px",
    background:
      "linear-gradient(0deg, rgba(53,91,108,1) 27%, rgba(45,112,253,1) 100%)",
  },
  plusIcon: {
    width: "60%",
    height: "100%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
    cursor: "pointer",
  },
  deteleBox: {
    width: "50px",
    height: "20px",
    position: "relative",
    right: "20%",
    top: "50px",
  },
  menu: {
    width: "50px",
    height: "50px",
    margin: "0 15px ",
    cursor: "pointer",
  },
  delete: {
    width: "50px",
    height: "30px",
    margin: "5px ",
    cursor: "pointer",
    "&:hover": {
      color: "red",
    },
  },

  miniCArt: {
    marginTop: "50px",
    width: "100%",
    padding: "15px",
    borderRadius: "8px",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[5]
        : theme.colors.gray[1],
  },
  contact: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  boxHead: {
    margin: "100px 0",
  },
  title: {
    fontSize: "32px",
    fontWeight: 700,
    textAlign: "center",
    paddingBottom: 40,
  },
  address: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyItems: "center",
  },
  more: {
    background: "#25262B",
    color: "#fff",
    cursor: "pointer",
  },
  choose: {
    display: "flex",
    gap: "20px",
  },
  col: {
    display: "flex",
    flexDirection: "column",
  },
}));

export default useStyles;
