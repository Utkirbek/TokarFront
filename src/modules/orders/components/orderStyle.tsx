import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  orderUserLink: {
    textDecoration: "none",
  },
  orderBtn: {
    width: "85px",
    fontSize: "13px",
    [`@media  (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "50px",
      fontSize: "12px",
      padding: "2px",
    },
  },
  orderTD: {
    fontSize: "12px",
    width: "auto",
    [`@media  (max-width: ${theme.breakpoints.sm}px)`]: {
      fontSize: "8px",
      width: "100px",
    },
    [`@media  (max-width: ${theme.breakpoints.xs}px)`]: {
      fontSize: "5px",
      width: "40px",
    },
  },
  orderTrash: {
    color: "red",
    cursor: "pointer",
  },
}));
export default useStyles;
