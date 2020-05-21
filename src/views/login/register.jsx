import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import image from "../../img/login.jpg";
import { Redirect } from "react-router-dom";
import Firebase from "../../firebase";
import { Session } from "bc-react-session";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";


const session = Session.get();

const LoginPage = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [setCardAnimation] = React.useState("cardHidden");



    if (session.isValid === true) {

        return <Redirect to="/dashboard" />
    }
    else {
        const uiConfig = {
            signInFlow: "popup",
            signInOptions: [
                {
                    provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                    scopes: [
                        'email'
                    ]
                },
                {
                    provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                    scopes: [

                        'email'
                    ]
                }],
            callbacks: {
                signInSuccessWithAuthResult: function (currentUser, credential, redirectUrl) {
                    Session.start({
                        payload: {

                        },
                        expiration: 86400000,

                    })

                    window.location.assign('/dashboard')
                    return false
                }
            }
        }

        return (
            <div>
                <Header
                    absolute
                    color="transparent"
                    brand="The Next Chapter"
                />
                <div

                    style={{
                        backgroundImage: "url(" + image + ")",
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                        display: "flex",
                        alignItems: "center ",
                        height: "100%",
                        minHeight: "100vh",
                        width: "100%",
                        objectFit: "cover",
                    }}
                >
                    <div class="form" method="post"
                        style={{ top: '50px' }}>
                        <h2>Register</h2>
                        <div class="logo"></div>
                        <div class="input">
                            <div class="inputBox">
                                <label> Name </label>
                                <input type="UserName" id="username" name="name" value={name}
                                    onChange={e => setName(e.target.value)} placeholder="UserName"
                                    width="100%"></input>

                            </div>
                            <div class="inputBox">
                                <label> Email </label>
                                <input type="email" id="email" name="email" value={email}
                                    onChange={e => setEmail(e.target.value)} placeholder="example@xyz.com"
                                    width="100%"></input>

                            </div>
                            <div class="inputBox">
                                <label> Password </label>
                                <input type="password" value={password} name="password" id="password"
                                    placeholder="********" onChange={e => setPassword(e.target.value)}></input>
                            </div>
                            <div class="inputBox">

                                <input type="submit" name="" value="Sign Up" onClick={onRegister}></input>
                            </div>
                        </div>
                        <br></br>
                        <div >
                            <StyledFirebaseAuth
                                uiConfig={uiConfig}
                                firebaseAuth={firebase.auth()}
                            />
                            <br></br>
                            <p class="register">Have an account? <a href="/login"> Login! </a></p>

                        </div>

                    </div>

                </div>
                <Footer />
            </div>
        );
    }
    async function onRegister() {
        if (name === '') {
            alert('Name field is empty! Please enter your name.')
        }
        else {
            try {

                await Firebase.register(name, email, password);
                props.history.replace('/');
            } catch (error) {
                alert(error.message)
            }
        }
    }
}

export default LoginPage;

