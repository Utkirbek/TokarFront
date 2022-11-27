import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  boxForm: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxLeft: {
    width: 550,
    padding: "70px 110px",
    color: "white",
    backgroundColor: "rgba(0,0,0, 0.5)",
    [`@media (max-width: 500px)`]: {
      padding: "30px 50px",
    },
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: 900,
    [`@media (max-width: 500px)`]: {
      fontSize: 20,
    },
  },
  color: {
    color:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.2)
        : theme.colors[theme.primaryColor][0],
  },
}));

export default useStyles;
