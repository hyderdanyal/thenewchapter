/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import HeaderLinks from "./Header/HeaderLinks";
import Footer from "./Footer/Footer";
import firebase from "./../firebase";
import { withRouter, Redirect } from "react-router-dom";
import UserProfile from "./session";
import { Session } from 'bc-react-session';
import BackgroundImg from "../img/profilebackground.jpg";
import LeftHeader from "../components/Header/leftheader";
import "./../Styles/editprofilestyle.css";
import tnclogo from "../img/tnc100.jpeg";



const session = Session.get();



const editprofile = (props) => {
    if (session.isValid === false) {
        alert('Please Login First!');
        return <Redirect to="/login" />
    }
    else {
        try {

            const { classes } = props
            // const allInputs = { imgUrl: '' }
            var [email, setEmail] = useState('');
            var [name, setName] = useState('');
            // var [imageAsFile, setImageAsFile] = useState('');
            // var [imageAsUrl, setImageAsUrl] = useState(allInputs);
            const [selectedFile, setSelectedFile] = useState('')
            const [preview,setPreview]=useState('')
            useEffect(()=>{
                if(!selectedFile){
                    setPreview(undefined)
                    return
                }
                const objectUrl=URL.createObjectURL(selectedFile)
                setPreview(objectUrl)

                return () => URL.revokeObjectURL(objectUrl)
            },[selectedFile])
            console.log("FILE",selectedFile)
            const fileSelectedHandler = e => {
              
                if(!e.target.files || e.target.files.length === 0){
                    setSelectedFile(undefined)
                    return
                }
                setSelectedFile(e.target.files[0])

                // if (e.target.files[0]) {
                //     const image = e.target.files[0];
                //     setFile(() => ({ image }));
                    
                // }
                // e.addEventListener('change', handlefile, false)
                // function handlefile() {
                //     const fileList = this.files;
                //     console.log(fileList)
                // }
                // console.log(file, "SETFILE", setFile)
                // const inputElement = document.getElementById("fileUpload").files[0];
                // inputElement.addEventListener("change", handleFiles, false)
                // function handleFiles() {
                //     const fileList = this.files;
                //     console.log(fileList)
                // }
            }
            async function handleFireBaseUpload(e) {
                // await firebase.uploadImage(file, setFile);

                // const { url } = file;
                // console.log("FILE::", file, "SETFILE::", url)
            }

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
                        <div

                            style={{
                                // background: "url(" + image + ")",
                                backgroundSize: "cover",
                                backgroundPosition: "top center",
                                display: "flex",
                                alignItems: "center ",
                                height: "100%",
                                minHeight: "120vh",
                                width: "100%",
                                objectFit: "cover",



                            }}
                        >

                            <div class="form" method="post" >
                                {/* {status === 'FILES_UPLOADED' && (
                                    <div className="success-container">
                                        <div>
                                            <h2>Congratulations!</h2>
                                            <small>You uploaded your files. Get some rest.</small>
                                        </div>
                                    </div>
                                )} */}
                                <h2>Edit Profile</h2>
                                <br></br>
                                {/* {files.map(({ src }) => ( */}
                                {/* <div class="logo2" style={{ backgroundImage: `url(${file})` }}> */}
                                <div>
                                    <input id="fileUpload" class="imgbutton" type="file" name="Upload" onChange={fileSelectedHandler}></input>
                                    <img src={preview} class="logo2"></img>
                                </div>
                                {/* ))} */}
                                <div class="input">
                                    <div class="inputBox">
                                        <label> Name </label>
                                        <input type="text" id="name" name="name" defaultValue={name = (firebase.getCurrentUsername())}
                                            onChange={e => setName(e.target.defaultValue)}
                                            width="100%"></input>
                                        <br></br>
                                        <br></br>

                                        <label> Email </label>
                                        <input type="email" id="email" name="email" defaultValue={email = (firebase.getCurrentEmail())}
                                            onChange={e => setEmail(e.target.defaultValue)}
                                            width="100%"></input>
                                        <br></br>
                                        <br></br>

                                    </div>
                                    <div class="inputBox">
                                        <input type="submit" name="" value="Change Password"
                                            onClick={resetPassword}
                                        ></input>

                                    </div>
                                    <div class="inputBox">


                                        <input type="submit" name="" value="Update Changes"
                                            onClick={editProfile}
                                        ></input>
                                    </div>
                                </div>
                                {/* <div
                                        style={{
                                            opacity: uploaded[id] ? 0.2 : 1,
                                        }}
                                        key={`thumb${index}`}
                                        className="thumbnail-wrapper"
                                    >
                                        <img className="thumbnail" src={src} alt="" />
                                        <div className="thumbnail-caption">{file.name}</div>
                                    </div>
                                ))} */}

                                <br></br>
                                <p class="register">Want to leave a feedback ? <a href="/loader"> <br></br>Click Here! </a></p>

                            </div>
                        </div>
                    </div>




                    <Footer></Footer>
                </>


            );


            function resetPassword() {
                var auth = firebase.auth;
                var emailAddress = email;

                auth.sendPasswordResetEmail(emailAddress).then(function () {
                    alert(`Email sent to ${emailAddress}. Please check your inbox`);
                }).catch(function (error) {

                    alert("Error:", error.message);
                })
            }
            async function editProfile() {
                try {
                    console.log("EDIT::",selectedFile)
                   await firebase.uploadImage(selectedFile)
                    firebase.editProfile(name, email)
                    alert("Profile Updated Successfully. Thank You!")
                    window.location.href="/profile"
                } catch (error) {
                    console.log(error)
                    alert("Error in Updating Profile", error)
                }
            }
        } catch (error) {
            console.log(error)
            alert("Login Again")
            return <Redirect to="/login" />
        }


    }

    //  );
}
export default withRouter(editprofile);