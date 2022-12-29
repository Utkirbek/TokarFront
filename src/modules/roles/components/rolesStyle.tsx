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
  rolbtn: {
    [`@media  (max-width: 900px)`]: {
      position: "absolute",
      bottom: "40px",
      width: "100%",
    },
  },
  rolbutton: {
    [`@media  (max-width: 900px)`]: {
      width: "100%",
    },
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
