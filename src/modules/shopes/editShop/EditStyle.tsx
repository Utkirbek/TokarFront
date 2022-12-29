import { createStyles } from "@mantine/core";

const EditStyle = createStyles(() => ({
  editbutton: {
    [`@media (max-width: 900px)`]: {
      width: "100%",
    },
  },
  editBtn: {
    [`@media (max-width: 900px)`]: {
      position: "absolute",
      bottom: "40px",
      width: "88%",
      textAlign: "center",
    },
  },
}));

export default EditStyle;
