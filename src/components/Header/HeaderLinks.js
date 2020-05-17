/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Button from "../CustomButtons/Button.js";


import styles from "../../Styles/headerLinksStyle";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (



    <Button
      href="/login"
      color="transparent"
      // target="_blank"
      className={classes.navLink}
    >

      Sign In
    </Button>



  );
}
