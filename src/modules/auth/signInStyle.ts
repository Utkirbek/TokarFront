import { createStyles } from "@mantine/core";

const useStyles = createStyles(() => ({
  boxForm: {
    position: "relative",
    top: 130,
    left: 500,
    width: 550,
    height: 450,
    backgroundColor: "rgba(0,0,0, 0.4)",
  },
  boxLeft: {
    width: 550,
    height: 450,
    display: "flex",
    marginLeft: 100,
    justifyItems: "center",
    alignItems: "center",
  },
}));

export default useStyles;
