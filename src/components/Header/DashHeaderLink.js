/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import {Person } from "@material-ui/icons";
// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import firebase from "../../firebase"
import styles from "../../Styles/headerLinksStyle";
import { Session } from 'bc-react-session';



const useStyles = makeStyles(styles);

function HeaderLinks(props) {
    const classes = useStyles();
    return (

        <List className={classes.list}>
            
            <ListItem className={classes.listItem}>
                <CustomDropdown
                    noLiPadding
                    buttonText={firebase.getCurrentUsername()}
                    buttonProps={{
                        className: classes.navLink,
                        color: "transparent"
                    }}
                    buttonIcon={Person}
                    dropdownList={[
                        <Button color="transparent" onClick={logout} className={classes.dropdownLink}>
                            Sign Out
                        </Button>,
                        <a
                            href="../profile"
                            // target="_blank"
                            className={classes.dropdownLink}
                        >
                            Profile
                        </a>
                    ]}
                />

            </ListItem>
        </List>


    );
    async function logout() {
        await firebase.logout()
        Session.destroy();
        window.location.href = '/';
    }
}
export default withRouter(HeaderLinks);