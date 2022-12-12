import { createStyles } from "@mantine/core";

const useDetailstyles = createStyles(() => ({
  titleHead: {
    fontSize: "36px",
    marginBottom: "20px",
    fontWeight: 600,
    color: "#1971C2",
    [`@media (max-width: 800px)`]: {
      fontSize: 18,
      marginBottom: 15,
    },
    textAlign: "center",
  },
  allDisplay: {
    width: "100%",
    minHeight: "75vh",
    margin: "auto",
  },
  itemGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
  },
  imageBox: {
    width: "380px",
    height: "350px",
    [`@media (max-width: 800px)`]: {
      display: "none",
    },
  },
  left: {
    width: "800px",
    [`@media (max-width: 800px)`]: {
      width: "100%",
    },
  },
  textStart: {
    textAlign: "start",
    width: "250px",
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 12,
      width: "150px",
    },
  },
  boxHeader: {
    width: "800px",
    [`@media (max-width: 800px)`]: {
      width: "100%",
    },
  },
  boxFlex: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
    [`@media (max-width: 800px)`]: {
      width: "280px",
    },
  },
  text: {
    minWidth: 130,
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 12,
    },
  },

  leftIcon: {
    size: 380,
  },
  discount: {
    fontSize: "26px",
    marginTop: 20,
    fontWeight: 600,
    color: "#1971C2",
  },
}));

export default useDetailstyles;
