import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
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
}));
export default useStyles;
