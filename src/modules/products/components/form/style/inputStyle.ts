import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
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
}));
export default useStyles;
