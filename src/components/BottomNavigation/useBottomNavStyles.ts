import { createStyles } from "@mantine/core";

export const useBottomNavStyles = createStyles((theme, _params, getRef) => {
  return {
    bottom_nav: {
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
    },
    action_btn: {
      flexGrow: 1,
      textOverflow: "wrap",
    },
  };
});
