import React, {useState} from 'react';
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";
import LeftHeader from "../components/Header/leftheader";
import styles from "../Styles/homeStyle";
import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import firebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
/* eslint-disable react-hooks/rules-of-hooks */
import BackgroundImg from "../img/profilebackground.jpg";
import "../Styles/profileStyle.css";
import { Link } from "react-router-dom";



const session = Session.get();

export default function profile(props) {
    if (session.isValid === false) {
        alert('Please Login First!');
        return <Redirect to="/login" />
    }
    else {
        try {

            return (
                <>
                    <div style={{
                        backgroundImage: `url(${BackgroundImg})`,

                        height: "130vh"
                    }}>
                        <Header
                            brand="The New Chapter"
                            leftLinks={<LeftHeader />}
                            rightLinks={<HeaderLinks />}
                            fixed
                            color="transparent"
                            changeColorOnScroll={{
                                height: 400,
                                color: "white"
                            }}
                        />

                    </div>

                    <div class="wrapper">
                        <div class="left">
                            {/* {console.log(displayPicture)} */}
                            <img src={firebase.getCurrentDisplayPhoto} alt="user" width="100" />
                            <h4>{firebase.getCurrentUsername()}</h4>
                            <Link to="/editprofile"><h5> <u>Edit Profile? </u></h5></Link>
                            <br></br>
                            <Link to="/feedback"><h5> <u>Want to give a feedback? </u></h5></Link>

                        </div>
                        <div class="right">
                            <div class="info">
                                <h3>Information</h3>
                                <div class="info_data">
                                    <div class="data">
                                        <h4>Email</h4>
                                        <p>{firebase.getCurrentEmail()}</p>
                                    </div>
                                    <div class="data">
                                        <h4>Phone</h4>
                                        <p>0001-213-998761</p>
                                    </div>
                                </div>
                            </div>

                            <div class="projects">
                                <h3>My Books</h3>
                                <div class="projects_data">
                                    <div class="data">
                                        <h4>My List</h4>
                                        <p>Lorem ipsum dolor sit amet.</p>
                                    </div>
                                    <div class="data">
                                        <h4>Liked</h4>
                                        <p>dolor sit amet.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="social_media">
                                <ul>
                                    <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i class="fab fa-twitter"></i></a></li>
                                    <li><a href="#"><i class="fab fa-instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>



                    <Footer></Footer>
                </>
            )
        } catch{
            alert("Login Again")
            return <Redirect to="/login" />
        }
    }


    //  );
}
