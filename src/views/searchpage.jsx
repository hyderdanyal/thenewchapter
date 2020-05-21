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
import ReactExpandableGrid from "../components/Grid/ExpandableGrid";
import queryString from 'query-string'

var value
var searchQuery
const session = Session.get();
var search_data
var search_data_strings


export default function searchpage(props) {
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


            const [searchState, setSearchState] = useState({
                searchhasLoaded: false,
                searchbook: [],
                searcherror: null
            })
            const [userId] = useState(0)


            function fetchBooksSearch() {
                value = queryString.parse(props.location.search)
                searchQuery = value.q
                fetch(`http://127.0.0.1:5000/searchresult?q=${searchQuery}`)
                    .then(response => response.json())
                    .then((data) => {

                        setSearchState({
                            searchbook: data,
                            searchhasLoaded: true
                        })

                    })
                    .catch(searcherror => setSearchState({
                        searcherror,
                        searchhasLoaded: true
                    }))


            }


            const { searchhasLoaded, searchbook, searcherror } = searchState
            useEffect(() => {
                fetchBooksSearch()



            }, [userId])



            search_data = searchbook.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { 'img': ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, 'title': Title, 'description': Desc, 'bookid': Bookid }

            })
            search_data_strings = JSON.stringify(search_data)


            return (

                <React.Fragment>
                    {searcherror ? <p>{searcherror.message}</p> : null}
                    {searchhasLoaded ? (
                        <div>

                            <div style={{ backgroundImage: `url(${BackgroundDiv})`, height: "140vh" }}>
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
                                    <br></br>
                                    <br></br>
                                    <h2><font color="#fead03"> Searched Books </font></h2>
                                    <div>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <br></br>


                                        {searchhasLoaded ? (
                                            <ReactExpandableGrid
                                                gridData={search_data_strings} />
                                        ) : (<Loader />)}
                                    </div>
                                    <br></br>

                                </div>


                            </div>
                            <Footer ></Footer>
                        </div>
                    )
                        : (<Loader />)}
                </React.Fragment>
            )
        } catch{
            alert("Login Again")
            return <Redirect to="/login" />
        }
    }
}