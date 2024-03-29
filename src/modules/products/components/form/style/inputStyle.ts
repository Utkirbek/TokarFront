import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  tableView: {
    "@media (max-width: 800px)": {
      display: "none",
    },
  },
  cardPagination: {
    "@media (max-width: 800px)": {
      marginBottom: "40px",
    },
  },
  cardView: {
    display: "none",
    "@media (max-width: 800px)": {
      display: "block",
    },
  },
  serch: {
    marginRight: "40px",
    "@media (max-width: 800px)": {
      marginLeft: "4px",
      marginRight: "40px",
    },
  },
  inputStyle: {
    margin: "15px 0",
  },
  search: {
    minWidth: 120,
    "@media (max-width: 800px)": {
      maxWidth: "100%",
    },
  },
  add: {
    "@media (max-width: 800px)": {
      marginTop: 10,
    },
  },
  userForm: {
    maxWidth: "440px",
    "@media (max-width: 600px)": {
      maxWidth: "320px",
    },
  },
  saerch: {
    width: "85%",
    [`@media (max-width: 800px)`]: {
      width: "100%",
      position: "fixed",
      top: "5px",
      left: "0px",
      right: "0px",
      zIndex: 999,
    },
  },
  flow: {
    [`@media (max-width:600px)`]: {
      marginTop: 20,
      overflowX: "scroll",
    },
  },
}));
export default useStyles;
