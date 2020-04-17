/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

// @material-ui/icons
import { Apps, CloudDownload, Person } from "@material-ui/icons";

// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import firebase from "../../firebase"
import styles from "../../Styles/headerLinksStyle";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            <ListItem className={classes.listItem}>

                <Button href="/dashboard" color="transparent" >
                    Dashboard
                </Button>

            </ListItem>

            <ListItem className={classes.listItem}>

                <Button href="/toppicks" color="transparent">
                    Top Picks
                </Button>

            </ListItem>
            <ListItem className={classes.listItem}>

                <Button href="/latest" color="transparent">
                    Latest
                </Button>

            </ListItem>
            <ListItem className={classes.listItem}>
                <Button href="/recommend" color="transparent">
                    Recommend
                </Button>
            </ListItem>
        </List>


    );

}
