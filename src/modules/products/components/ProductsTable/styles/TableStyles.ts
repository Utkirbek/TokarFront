import { createStyles } from "@mantine/core";

const useTableStyles = createStyles((theme) => ({
  minStock: {
    borderLeft: `5px solid ${theme.colors.red[8]}`,
  },
  noPriceWarning: {
    borderLeft: `5px solid ${theme.colors.yellow[5]}`,
  },
}));

export default useTableStyles;
