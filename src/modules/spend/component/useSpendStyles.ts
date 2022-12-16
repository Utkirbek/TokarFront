import { createStyles } from "@mantine/styles";

export const useSpendStyles = createStyles(() => ({
  tr: {
    minWidth: 400,
    margin: "25px 0",
    textAlign: "center",
  },
  td: {
    width: "10%",
    padding: "5px",
    border: "1px solid",
  },
  spendAdd: {
    [`@media (max-width: 900px)`]: {
      display: "none",
    },
  },
  spendAddIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#1864AB",
    display: "none",
    [`@media (max-width: 900px)`]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  spendButton: {
    [`@media (max-width: 900px)`]: {
      width: "100% !important",
    },
  },
  btnResponse: {
    [`@media (max-width: 900px)`]: {
      position: "absolute",
      width: "90%",
      margin: "0px auto",
      bottom: "40px",
    },
  },
}));
