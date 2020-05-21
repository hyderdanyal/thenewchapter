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
import queryString from 'query-string'


var value
var selectedGenre

const session = Session.get();
var genre_data
var genre_data_strings


export default function genre(props) {
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

            const [genreState, setGenreState] = useState({
                genrehasLoaded: false,
                genrebooks: [],
                genreerror: null
            })
            const [userId] = useState(0)



            function fetchBooksGenre() {
                value = queryString.parse(props.location.search)
                selectedGenre = value.genre

                fetch(`http://127.0.0.1:5000/genre?genre=${selectedGenre.toLowerCase()}`)
                    .then(response => response.json())
                    .then((data) => {

                        setGenreState({
                            genrebooks: data,
                            genrehasLoaded: true
                        })

                    })
                    .catch(genreerror => setGenreState({
                        genreerror,
                        genrehasLoaded: true
                    }))


            }

            const { genrehasLoaded, genrebooks, genreerror } = genreState
            useEffect(() => {

                fetchBooksGenre()
            }, [userId])


            genre_data = genrebooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { 'img': ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, 'title': Title, 'description': Desc, 'bookid': Bookid }

            })
            genre_data_strings = JSON.stringify(genre_data)

            return (
                <>
                    {genreerror ? <p>{genreerror.message}</p> : null}
                    {genrehasLoaded ? (
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
                                <h2><font color="#fead03"> Genre  >   {selectedGenre}</font></h2>
                                <div >
                                    {genrehasLoaded ? (
                                        <ReactExpandableGrid
                                            gridData={genre_data_strings} />
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

            return <Loader />
        }
    }


}