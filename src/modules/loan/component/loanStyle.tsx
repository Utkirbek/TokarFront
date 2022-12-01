import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  loanUserLink: {
    borderBottom: "1px solid #1983FF",
    textDecoration: "none",
  },
  LoanTime: {
    width: "auto",
    [`@media  (max-width: ${theme.breakpoints.sm}px)`]: {
      minWidth: "100px",
    },
  },
  loanTable: {
    width: "100%",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "100%",
    },
  },
  loanBtn: {
    width: "85px",
    fontSize: "13px",
    [`@media  (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "50px",
      fontSize: "12px",
      padding: "2px",
    },
  },
}));
export default useStyles;
