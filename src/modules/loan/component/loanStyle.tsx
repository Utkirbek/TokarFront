import { createStyles } from "@mantine/core";

const useLoanStyles = createStyles((theme) => ({
  loanUserLink: {
    borderBottom: "1px solid #1983FF",
    textDecoration: "none",
  },
  loanAllDisplay: {
    width: "100%",
    minHeight: "75vh",
  },
  loanItemGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
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
    minWidth: 300,
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      minWidth: 180,
      fontSize: 18,
    },
    [`@media (max-width: 520px)`]: {
      minWidth: 200,
    },
    [`@media (max-width: 470px)`]: {
      fontSize: 12,
      minWidth: 120,
    },
  },

  boxFlex: {
    minWidth: 200,
    display: "flex",
    justifyContent: "space-around",
    marginTop: "5px",
    marginLeft: "35px",
    [`@media (max-width: 470px)`]: {
     display:"flex",
     justifyContent :"space-between",
     width : "100%",
     margin : "0"
    },
  },
  text: {
    minWidth: 200,
    fontSize: "23px",
    textAlign: "left",
    [`@media (max-width: 800px)`]: {
      minWidth: 150,
      fontSize: 18,
    },
    [`@media (max-width: 470px)`]: {
      fontSize: 12,
      minWidth: 100,
    },
    [`@media (max-width: 390px)`]: {
      fontSize: 12,
      minWidth: 80,
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
}));
export default useLoanStyles;
