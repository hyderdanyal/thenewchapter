/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import BackgroundDiv from "../img/divwood.jpg";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";
import "react-multi-carousel/lib/styles.css";
import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import firebase from "../firebase";
import LeftHeader from "../components/Header/leftheader";
import { useEffect } from "react";
import { useState } from "react";
import Loader from '../components/loader'
import Slider from '../components/Slider/components/NetflixSlider'






const session = Session.get();
var rating_data
var mf_data


export default function mylist(props) {
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


            const [ratingState, setRatingState] = useState({
                ratinghasLoaded: false,
                ratingbooks: [],
                ratingerror: null
            })

            const [mfState, setMfState] = useState({
                mfhasLoaded: false,
                mfbooks: [],
                mferror: null
            })

            const [userId] = useState(0)

            const { ratinghasLoaded, ratingbooks, ratingerror } = ratingState
            const { mfhasLoaded, mfbooks, mferror } = mfState

            function fetchBooksRating() {

                fetch("http://127.0.0.1:5000/ratingbased")
                    .then(response => response.json())
                    .then((data) => {

                        setRatingState({
                            ratingbooks: data,
                            ratinghasLoaded: true
                        })

                    })
                    .catch(ratingerror => setRatingState({
                        ratingerror,
                        ratinghasLoaded: true
                    }))


            }

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
            function fetchBookID() {
                let uid = firebase.getCurrentUID()
                let uname = firebase.getCurrentUsername()
                fetch(`http://127.0.0.1:5000/bookname?name=${uname}&uid=${uid}`)
                // console.log("ddddd", uname,uid )
            }

            useEffect(() => {
                fetchBooksRating()
                fetchBooksMf()
                fetchBookID()


                // firebase.bookExists()
            }, [userId])


            rating_data = ratingbooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }

            })

            mf_data = mfbooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }

            })




            return (

                <React.Fragment >
                    {ratingerror ? <p>{ratingerror.message}</p> : null}
                    {ratinghasLoaded ? (
                        <div style={{ height: "100", backgroundImage: `url(${BackgroundDiv})` }}>
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



                            <div >
                                <br></br>
                                <h2><font color="#fead03"> Top Books </font></h2>
                                <div>
                                    <Slider>
                                        {rating_data.map(rating_data => (
                                            <Slider.Item movie={rating_data} key={rating_data.id}>item1</Slider.Item>
                                        ))}
                                    </Slider>
                                </div>
                                <br></br>

                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div >
                                <br></br>
                                <h2><font color="#fead03"> Recommended Books </font></h2>
                                <div>
                                    {mfhasLoaded ? (
                                        <Slider>
                                            {mf_data.map(mf_data => (
                                                <Slider.Item movie={mf_data} key={mf_data.id}>item1</Slider.Item>
                                            ))}
                                        </Slider>

                                    ) : (mferror)}


                                </div>
                                <br></br>
                                <br></br>
                                <br></br>
                            </div>



                            <Footer></Footer>
                        </div>
                    ) : (<Loader />)}
                </React.Fragment>
            )
        } catch{
            return <Loader />
        }
    }
}