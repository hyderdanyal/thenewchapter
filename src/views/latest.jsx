import React from 'react';
/* eslint-disable react-hooks/rules-of-hooks */
import BackgroundDiv from "../img/divwood.jpg";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";
import "react-multi-carousel/lib/styles.css";
import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import firebase from "../firebase";
import LeftHeader from "../components/Header/leftheader";
import ReactExpandableGrid from "../components/Grid/ExpandableGrid";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/loader";


const session = Session.get();
var latest_data
var latest_data_strings


export default function latest(props) {
    if (session.isValid === false) {
        alert('Please Login First!');
        return <Redirect to="/login" />
    }
    else {


        try {

            if (!firebase.getCurrentUsername()) {
                alert('Please Login First')
                props.history.replace('/login')
                return null
            }

            const [latestState, setLatestState] = useState({
                latesthasLoaded: false,
                latestbooks: [],
                latesterror: null
            })
            const [userId] = useState(0)

            function fetchBooksLatest() {

                fetch("http://127.0.0.1:5000/timebased")
                    .then(response => response.json())
                    .then((data) => {

                        setLatestState({
                            latestbooks: data,
                            latesthasLoaded: true
                        })

                    })
                    .catch(latesterror => setLatestState({
                        latesterror,
                        latesthasLoaded: true
                    }))


            }

            const { latesthasLoaded, latestbooks, latesterror } = latestState
            useEffect(() => {
                fetchBooksLatest()
            }, [userId])

            latest_data = latestbooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { 'img': ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, 'title': Title, 'description': Desc, 'bookid': Bookid }

            })
            latest_data_strings = JSON.stringify(latest_data)

            return (
                <>
                    {latesterror ? <p>{latesterror.message}</p> : null}
                    {latesthasLoaded ? (
                        <div style={{
                            backgroundImage: `url(${BackgroundDiv})`,
                            height: "100%"
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
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div >
                                <h2><font color="#fead03"> Latest Books </font></h2>
                                <div >
                                    {latesthasLoaded ? (
                                        <ReactExpandableGrid
                                            gridData={latest_data_strings} />
                                    ) : (<Loader />)}
                                </div>
                                <br></br>
                            </div>



                            <Footer></Footer>
                        </div>
                    ) : (<Loader />)}
                </>
            )
        } catch{
            alert("Login Again")
            return <Redirect to="/login" />
        }
    }


}

