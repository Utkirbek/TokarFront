import { createStyles } from "@mantine/core";

const useRolesStyles = createStyles((theme) => ({
  rolesActionBtn: {
    height: "104px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  rolesGrid: {
    display: "flex",
    justifyContent: "space-between",
  },
  grid: {
    [`@media  (max-width: ${theme.breakpoints.md}px)`]: {
      display: "none",
    },
  },
  flex: {
    display: "none",
    [`@media  (max-width: ${theme.breakpoints.md}px)`]: {
      display: "block",
    },
  },
}));
export default useRolesStyles;
