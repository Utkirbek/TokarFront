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
  orderCardHead: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
  },
  orderHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tex: {
    fontSize: 14,
    [`@media (max-width: 800px)`]: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  },
  orderTable: {
    [`@media (max-width: 1000px)`]: {
      display: "none",
    },
  },
  orderCard: {
    display: "none",
    [`@media (max-width: 1000px)`]: {
      display: "block",
    },
  },
  orderCardBox: {
    width: "100%",
    height: "150px",
    padding: "8px",
    border: "0.2px solid #444",
    borderRadius: "8px",
    fontSize: 14,
  },
  cardBox: {
    width: "100%",
    height: "150px",
    padding: "8px",
    border: "0.2px solid #444",
    borderRadius: "8px",
    fontSize: 14,
    [`@media (max-width: 400px)`]: {
      minWidth: 220,
    },
  },
  table: {
    [`@media (max-width:950px)`]: {
      display: "none",
    },
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
}));
export default useStyles;
