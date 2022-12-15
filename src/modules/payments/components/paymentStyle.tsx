import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  paymentBox: {
    maxWidth: 440,
    height: "auto",
  },
  paymentText: {
    textAlign: "center",
    fontSize: "28px",
    fontWeight: 700,
  },
  paymentSelect: {
    width: "100%",
    margin: "20px  0",
  },
  inputStyle: {
    margin: "15px 0",
  },
  paymentsAdd: {
    [`@media (max-width: 900px)`]: {
      display: "none",
    },
  },
  paymentsAddIcon: {
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
  paymentsBtn: {
    [`@media (max-width: 900px)`]: {
      position: "absolute",
      width: "100%",
      bottom: "40px",
    },
  },
  paymentsButton: {
    [`@media (max-width: 900px)`]: {
      width: "100%",
    },
  },
}));
export default useStyles;
