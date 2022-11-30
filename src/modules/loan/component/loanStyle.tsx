import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  loanUserLink: {
    borderBottom: "1px solid #1983FF",
    textDecoration: "none",
  },
  loanTable: {
    width: "100%",
    [`@media (max-width: ${theme.breakpoints.xl}px)`]: {
      width: "100%",
    },

    [`@media  (max-width: 700px)`]: {
      width: "500px",
    },
  },
}));
export default useStyles;
