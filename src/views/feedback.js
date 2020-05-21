import React, { useState } from 'react';
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";
import BackgroundImg from "../img/profilebackground.jpg";
import LeftHeader from "../components/Header/leftheader";
import { Session } from 'bc-react-session';
import { Redirect } from "react-router-dom";
import "../Styles/feedbackstyle.css";
import firebase from "../firebase";
/* eslint-disable react-hooks/rules-of-hooks */




const session = Session.get();




const Contact = () => {
    if (session.isValid === false) {
        alert('Please Login First!');
        return <Redirect to="/login" />
    }
    else {
        try {

            let [name, setName] = useState("");
            let [email, setEmail] = useState("");
            let [message, setMessage] = useState("");
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
                        <div class="form" method="post">
                            <h2>Feedback</h2><br></br><br></br><br></br>
                            <div class="logo"></div>
                            <div class="input">

                                <div class="inputBox">
                                    <label> UserName </label>
                                    <input type="UserName" id="username" name="name" value={name}
                                        onChange={e => setName(e.target.value)} placeholder={firebase.getCurrentUsername()}
                                        width="100%"></input>
                                </div>
                                <div class="inputBox">
                                    <label> Email </label>
                                    <input type="email" id="email" name="email" value={email}
                                        onChange={e => setEmail(e.target.value)} placeholder={firebase.getCurrentEmail()}
                                        width="100%"></input>

                                </div>

                                    <div class="inputBox1">
                                    <label> Message </label>
                                    <textarea rows="3" columns="10" placeholder="your feedback"
                                        onChange={function (e) {
                                            setMessage(e.target.value);

                                        }}></textarea></div>
                                <div class="inputBox">

                                    <input type="submit" name="" value="Submit" onClick={()=> {
                                        try {
                                            
                                            fetch(`http://127.0.0.1:5000/feedback?name=${name}&email=${email}&msg=${message}`)
                                            alert('Feedback Submitted, Thank You!');
                                             window.location.href="/profile"
                                            
                                        } catch (err) {
                                            console.log(err)
                                        }
                                    }} ></input>
                                </div>
                            </div>

                        </div>

                    </div>
                    <Footer></Footer>
                </>
            );
        } catch (error) {
            console.log(error)
            alert("Login Again")
            return <Redirect to="/login" />
        }
    }
}

export default Contact;
    /* <div class="wrapper" style={{
                justifyContent: "center"
    
    
            }}>
                <form class="form">
                    <div class="contact-logo">
                        <h2>Contact us</h2>
                    </div>
    
                    <div class="input">
                        <div class="inputbox" style={{ border: 1 }}>
                            <h2>Your Name (required)</h2>
                            <input type="text"
                                onChange={
                                    function (event) {
                                        setName(event.target.value);
    
                                    }
                                }
                            />
                        </div>
    
                        <div class="email">
                            <h2>Your Email (required)</h2>
                            <input type="text"
                                onChange={
                                    function (event) {
                                        setEmail(event.target.value);
    
                                    }
                                }
                            />
                        </div>
    
                        <div class="subject">
                            <h2>Subject</h2>
                            <input type="text"
                                onChange={
                                    function (event) {
                                        setSubject(event.target.value);
    
                                    }
                                }
                            />
                        </div>
    
                        <div class="message">
                            <h2>Your message</h2>
                            <input type="text"
                                onChange={
                                    function (event) {
                                        setMessage(event.target.value);
    
                                    }
                                }
                            />
                        </div>
    
                        <div class="but">
                            <button type="button"
                                onClick={async function (event) {
                                    console.log("Sending ...")
                                    try {
                                        let response = await fetch(`https://server.hyderhadi.now.sh/index.js?name=${name}&email=${email}&message=${message}&subject=${subject}`);
                                        console.log("Done");
                                        console.log(response);
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }} >SEND</button>
                        </div>
                        </div>
                        </form>
                    </div> */





















































