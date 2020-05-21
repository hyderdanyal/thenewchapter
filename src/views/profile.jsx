import React, { useState } from 'react';
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";
import LeftHeader from "../components/Header/leftheader";
import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import firebase from "../firebase";
/* eslint-disable react-hooks/rules-of-hooks */
import BackgroundImg from "../img/profilebackground.jpg";
import "../Styles/profileStyle.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";




const session = Session.get();
var myListBooks = []
var elements

export default function profile(props) {
    if (session.isValid === false) {
        alert('Please Login First!');
        return <Redirect to="/login" />
    }

    else {
        try {
            const [myList, setMyList] = useState({
                hasLoaded: false
            })

            const [userId] = useState(0)
            const [deleteBook, setDeleteBook] = useState(false)



            useEffect(() => {

                firebase.readMyList(firebase.getCurrentUID(), firebase.getCurrentUsername())
                    .then((response) => {

                        myListBooks = response.map(book => {
                            const { Title, Bookid

                            } = book

                            return {

                                title: Title, id: Bookid

                            }

                        })
                        setMyList({ hasLoaded: true })

                    })


            }, [userId])


            const { hasLoaded } = myList
            if (hasLoaded) {


                elements = myListBooks.map((element) => {
                    return (
                        <li key={element.id}>--> {element.title}
                            <button style={{ backgroundColor: 'transparent', border: 'none' }} onClick={() => { deleteValue(element.id, element.title) }}>🗑️</button>
                            <br></br><br></br>
                        </li>
                    )
                })
                const deleteValue = (e, h) => {
                    if (window.confirm('Are you sure you want to delete ' + h + '?')) {
                        firebase.deleteBook(e)
                        setDeleteBook(true)

                    } else {

                    }

                }
            }
            if (deleteBook) {
                firebase.readMyList(firebase.getCurrentUID(), firebase.getCurrentUsername())
                    .then((response) => {

                        myListBooks = response.map(book => {
                            const { Title, Bookid

                            } = book

                            return {

                                title: Title, id: Bookid

                            }

                        })
                        setMyList({ hasLoaded: true })

                    })
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

                    </div>

                    <div class="wrapper2">
                        <div class="left">

                            <img src={firebase.getCurrentDisplayPhoto()} alt="user" width="100" />
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

                                </div>
                            </div>

                            <div class="projects">
                                <h3>My Books</h3>
                                <div class="projects_data">
                                    <div class="data">

                                        <h4>My List</h4>
                                        <div id="myListContainer" style={{ color: '#fead03' }}><ul>{elements}</ul>  </div>

                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>



                    <Footer></Footer>
                </>
            )
        } catch (error) {
            console.log(error)
        }
    }



}
