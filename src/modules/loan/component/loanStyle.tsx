import { createStyles } from "@mantine/core";

const useLoanStyles = createStyles((theme) => ({
  loanUserLink: {
    borderBottom: "1px solid #1983FF",
    textDecoration: "none",
  },
  loanAllDisplay: {
    width: "100%",
    minHeight: "75vh",
    position: "relative",
    [`@media (max-width: 800px)`]: {
      height: "90vh",
    },
  },
  loanItemGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    [`@media (max-width: 800px)`]: {
      flexWrap: "wrap",
    },
  },
  loanImageBox: {
    width: "380px",
    height: "350px",
    [`@media (max-width: 600px)`]: {
      width: "200px",
      height: "200px",
    },
  },
  left: {
    width: "100%",
  },
  titleHead: {
    fontSize: "36px",
    marginBottom: "20px",
    fontWeight: 600,
    color: "#1971C2",
    [`@media (max-width: 800px)`]: {
      fontSize: 18,
      marginBottom: 15,
    },
    textAlign: "center",
  },

  textStart: {
    textAlign: "left",
    fontSize: "23px",
    [`@media (max-width: 1000px)`]: {
      fontSize: 15,
    },
  },

  boxFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
    padding: "0px 50px",
    [`@media (max-width: 800px)`]: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      margin: "0",
      padding: "0px 10px",
    },
  },
  text: {
    fontSize: "23px",
    [`@media (max-width: 1000px)`]: {
      fontSize: 15,
    },
  },
  loanTrash: {
    color: "red",
    cursor: "pointer",
  },
  LoanTime: {
    width: "auto",
    [`@media  (max-width: ${theme.breakpoints.sm}px)`]: {
      minWidth: "100px",
    },
  },
  loanTable: {
    [`@media (max-width: 900px)`]: {
      display: "none",
    },
  },
  loanCard: {
    display: "none",
    [`@media (max-width: 900px)`]: {
      display: "block",
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
  LoanCardBox: {
    width: "100%",
    height: "150px",
    padding: "8px",
    border: "0.2px solid #444",
    borderRadius: "8px",
    fontSize: 14,
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
export default useLoanStyles;
