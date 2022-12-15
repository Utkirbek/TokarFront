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
    [`@media (max-width: 550px)`]: {
      width: "100%",
      padding: "30px 25px",
    },
  },
  btn: {
    [`@media (max-width: 550px)`]: {
      width: "100%",
    },
  },
  text: {
    fontSize: 32,
    textAlign: "center",
    fontWeight: 900,
    [`@media (max-width: 550px)`]: {
      fontSize: 20,
    },
  },
  titleHeder: {
    [`@media (max-width: 550px)`]: {
      fontSize: 22,
    },
  },
  titleP: {
    [`@media (max-width: 550px)`]: {
      fontSize: 14,
    },
  },
  signBtn: {
    [`@media (max-width: 550px)`]: {
      width: "100%",
    },
  },
  category: {
    textAlign: "center",
    [`@media (max-width: 550px)`]: {
      width: "100%",
      padding: "0px 25px",
    },
  },
  stepper: {
    [`@media (max-width: 550px)`]: {
      width: "100%",
      padding: "0px 25px",
    },
  },
}));

export default useStyles;
