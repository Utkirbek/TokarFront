import { createStyles } from "@mantine/core";

const CartStyle = createStyles(() => ({
  moadlImage: {
    width: 500,
    textAlign: "center",
    margin: "auto",
    ["@media(max-width:800px)"]: {
      width: "100%",
    },
  },
  modalHead: {
    position: "relative",
    ["@media(max-width:800px)"]: {
      height: "90vh",
    },
  },
  modalBtn: {
    width: "100%",
    display: "none",
    position: "absolute",
    bottom: "0",
    [`@media (max-width: 800px)`]: {
      display: "block",
    },
  },
}));

export default CartStyle;
