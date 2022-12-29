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
    position: "relative",
    [`@media (max-width: 800px)`]: {
      height: "90vh",
    },
  },
  itemGroup: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",

    [`@media (max-width: 500px)`]: {
      justifyContent: "center",
    },
    [`@media (max-width: 1200px)`]: {
      justifyContent: "center",
      flexWrap: "wrap",
    },
  },
  imageBox: {
    width: "380px",
    height: "350px",
    padding: "35px",
    [`@media (max-width: 1300px)`]: {
      width: "300px",
      height: "300px",
      padding: "0px",
    },
    [`@media (max-width: 440px)`]: {
      width: "300px",
      height: "300px",
      marginBottom: "5px",
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
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 15,
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
    padding: "0px 50px",
    [`@media (max-width: 800px)`]: {
      padding: "0px 10px",
    },
  },
  modalBtn: {
    width: "100%",
    display: "none",
    position: "absolute",
    bottom: "0",
    [`@media (max-width: 800px)`]: {
      display: "block",
    },
  },
  text: {
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 15,
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
