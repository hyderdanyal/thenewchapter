import React, { useState, useEffect } from "react";
import "./App.scss";
import Register from "./components/login/register";
import LoginPage from "./components/login/login"
import { Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Loader from "./components/loader";
import firebase from "./firebase";
import Dashboard from "./components/dashboard"
import TypedR from "./Styles/typed"
import TopPicks from "./components/toppicks"
import Latest from "./components/latest"
import Genre from "./components/genre"
import Recommend from "./components/recommend"
import Profile from "./components/profile"
import EditProfile from "./components/editprofile"
import CreativeTeam from "../src/components/Footer/creativeteam"
import AboutUs from "../src/components/Footer/aboutus"
import Privacy from "../src/components/Footer/privacy"
import Licenses from "../src/components/Footer/licenses"
import Feedback from "./components/feedback"
import Background from "./components/Background"
import SearchPage from "./components/searchpage"
// import InitialData from "./components/initialdata"

function App() {

  const [firebaseInitialised, setFirebaseInitialised] = useState(false);

  useEffect(() => {
    firebase.isInitialized().then(val => {
      setFirebaseInitialised(val);
    })
  })

  return firebaseInitialised !== false ? (
    <>
      <BrowserRouter>

        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/typed" component={TypedR} />
        <Route exact path="/toppicks" component={TopPicks} />
        <Route exact path="/latest" component={Latest} />
        <Route exact path="/genre" component={Genre} />
        <Route exact path="/recommend" component={Recommend} />
        <Route exact path="/loader" component={Loader} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/editprofile" component={EditProfile} />
        <Route exact path="/footer/creativeteam" component={CreativeTeam} />
        <Route exact path="/footer/aboutus" component={AboutUs} />
        <Route exact path="/footer/privacy" component={Privacy} />
        <Route exact path="/footer/licenses" component={Licenses} />
        <Route exact path="/feedback" component={Feedback} />
        <Route exact path="/Background" component={Background}/>
        <Route exact path="/searchpage" component={SearchPage}/>
        {/* <Route exact path="/initialdata" component={InitialData}/> */}
      </BrowserRouter>
    </>
  ) : <div id="loader"><Loader /></div>
}

export default App;
