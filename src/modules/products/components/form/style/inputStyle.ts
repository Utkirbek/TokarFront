import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  inputStyle: {
    margin: "15px 0",
  },
  search: {
    minWidth: 120,
    "@media (max-width: 400px)": {
      maxWidth: "100%",
    },
  },
  add: {
    "@media (max-width: 600px)": {
      marginTop: 10,
    },
  },
}));
export default useStyles;
