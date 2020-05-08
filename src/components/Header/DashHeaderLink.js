/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link, Redirect, withRouter } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";

// @material-ui/icons
import { Apps, CloudDownload, Person } from "@material-ui/icons";
import UserProfile from "../../components/session";
// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js";
import Button from "../CustomButtons/Button.js";
import firebase from "../../firebase"
import styles from "../../Styles/headerLinksStyle";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { Session } from 'bc-react-session';
import Search from "../../components/search"


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