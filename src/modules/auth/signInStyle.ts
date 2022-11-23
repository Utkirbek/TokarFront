import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
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
}));

export default useStyles;
