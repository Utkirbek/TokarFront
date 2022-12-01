import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  boxForm: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  boxLeft: {
    padding: "70px 0 0 0",
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
