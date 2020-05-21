import React from 'react';
import BackgroundDiv from "../img/divwood.jpg";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";

import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import LeftHeader from "../components/Header/leftheader";
/* eslint-disable react-hooks/rules-of-hooks */

import ReactExpandableGrid from "../components/Grid/ExpandableGrid";

import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/loader";
import firebase from "../firebase";







const session = Session.get();
var mf_data
var mf_data_strings
var isDataFetching = false

export default function recommend(props) {
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

            const [userId] = useState(0)

            const [mfState, setMfState] = useState({
                mfhasLoaded: false,
                mfbooks: [],
                mferror: null
            })

            function fetchBooksMf() {
                let uid = firebase.getCurrentUID()
                fetch(`http://127.0.0.1:5000/matrixfactorization?uid=${uid}`)
                    .then(response => response.json())
                    .then((data) => {

                        setMfState({
                            mfbooks: data,
                            mfhasLoaded: true
                        })

                    })
                    .catch(mferror => setMfState({
                        mferror,
                        mfhasLoaded: true
                    }))


            }

            const { mfhasLoaded, mfbooks, mferror } = mfState

            useEffect(() => {
                fetchBooksMf()
            }, [userId])

            mf_data = mfbooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { 'img': ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, 'title': Title, 'description': Desc, 'bookid': Bookid }

            })
            mf_data_strings = JSON.stringify(mf_data)


            return (
                <>
                    {mferror ? <p>{mferror.message}</p> : null}
                    {mfhasLoaded ? (
                        <div style={{
                            backgroundImage: `url(${BackgroundDiv})`,
                            height: "100"
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
                            <div style={{ background: 'white' }}>

                            </div>
                            <div >



                                <div >
                                    <br></br>
                                    <h2><font color="#fead03"> Recommended Books </font></h2>
                                    <div>
                                        {mfhasLoaded ? (
                                            <ReactExpandableGrid
                                                gridData={mf_data_strings} />
                                        ) : (<Loader />)}
                                    </div>





                                </div>




                            </div>


                            <Footer></Footer>
                        </div>
                    ) : (<Loader />)}
                </>
            )
        } catch{

            return <Loader />
        }

    }
}