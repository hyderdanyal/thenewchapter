/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import image from "../../img/login.jpg";
import Firebase from "../../firebase";
import { withRouter, Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import firebase from "firebase"


const session = Session.get();

const RegisterPage = (props) => {
  if (session.isValid === true) {

    return <Redirect to="/dashboard" />
  }
  else {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


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
        signInSuccessWithAuthResult: function (result) {


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
      <>

        <div  >
          <Header
            absolute
            color="transparent"
            brand="The Next Chapter"


          />

          <div

            style={{
              background: "url(" + image + ")",
              backgroundSize: "cover ",
              backgroundPosition: "top center",
              display: "flex",
              alignItems: "center ",
              height: "100%",
              minHeight: "120vh",
              width: "100%",
              objectFit: "cover",


            }}
          >

            <div class="form" method="post"
              style={{
                top: '-30px'
              }}>
              <h2>Login</h2>
              <br></br>
              <div class="logo"></div>
              <div class="input">
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

                  <input type="submit" name="" value="Sign In" onClick={login}></input>
                </div>
              </div>
              <p class="forget">Forgot Password ? <text onClick={resetPassword}> <u>Click Here</u> </text></p>
              <div >
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
              <br></br>

              <br></br>
              <p class="register">Don't have an account? <a href="/register"> Register! </a></p>

            </div>


          </div>
        </div>


        <Footer />

      </>
    );


    function resetPassword() {
      var auth = Firebase.auth;
      var emailAddress = email;
      auth.sendPasswordResetEmail(emailAddress).then(function () {
        alert(`Email sent to ${emailAddress}. Please check your inbox`);
      }).catch(function (error) {
        alert("Error:", error);
      })
    }
    async function login() {

      try {

        await Firebase.login(email, password);
        Session.start({
          payload: {

          },
          expiration: 86400000,

        });

        window.location.href = '/dashboard';

      } catch (error) {
        alert(error.message);
      }
    }
  }
}
export default withRouter(RegisterPage);



