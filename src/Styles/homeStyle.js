import { container } from "./material-kit-react";
import { fade } from "@material-ui/core/styles";
const componentsStyle = theme => ({

  container,
  brand: {
    color: "#FFFFFF",
    textAlign: "center",
    display: "grid",
    align: "center",
    margin: "0 auto",
    bottom: "5px"
  },
  typed: {
    fontSize: "3rem",
    position: "absolute",
    textAlign: "center",
    margin: "0 auto",
    display: "inline-flex",
    padding: "0",
    fontFamily: "Monotype Corsiva",
    color: "#fff",
    bottom: "15%",

  },
  title: {
    fontSize: "2.6rem",
    fontWeight: "500",
    display: "inline-block",
    position: "relative",
    top:"15px"



  },
  subtitle: {
    fontSize: "1.45rem",
    maxWidth: "500px",
    margin: "25px 0 0",
    textAlign: 'left',
    bottom: "50%",
    letterSpacing:"0.1rem"

  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 20),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"

  },
  divbutton: {
    position: "relative",
    width: "20%",
    margin: "0 auto",

    background: "red",
    color: "yellow"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  link: {
    textDecoration: "none"
  },
  textCenter: {
    textAlign: "center"
  }
});

export default componentsStyle;
