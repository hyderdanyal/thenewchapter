/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import BackgroundDiv from "../img/divwood.jpg";
import Header from "./Header/Header";
import HeaderLinks from "./Header/DashHeaderLink";
import Footer from "./Footer/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Book1 from "../img/book1.jpg"
import Book2 from "../img/book2.jpg"
import Book3 from "../img/book3.jpg"
import Book4 from "../img/book4.jpg"
import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import firebase from "../firebase";
import LeftHeader from "./Header/leftheader";
import ReactExpandableGrid from "./Grid/ExpandableSlider";
import { useEffect } from "react";
import { useState } from "react";
import Loader from './loader'





const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

const session = Session.get();
var rating_data
var rating_data_strings


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

            const [ratingState,setRatingState]=useState({
                ratinghasLoaded:false,
                ratingbooks:[],
                ratingerror:null
            })

            const {ratinghasLoaded,ratingbooks,ratingerror}=ratingState
                                                      
                                            function fetchBooksRating(){
                        
                                                fetch("http://127.0.0.1:5000/ratingbased")
                                                        .then(response=>response.json())
                                                        .then((data)=>{
                                                            
                                                            setRatingState({
                                                                ratingbooks:data,
                                                                ratinghasLoaded:true
                                                            })
                                                            
                                                        })
                                                        .catch(ratingerror=>setRatingState({
                                                            ratingerror,
                                                            ratinghasLoaded:true}))
                                                            
                                                            
                                                        }
                                                
                                                            // const{ratinghasLoaded,ratingbooks,ratingerror}=ratingState
                                                            useEffect(()=>{
                                                                fetchBooksRating()
                                                            })

            rating_data=ratingbooks.map(book=>{
                        const{Title,Bookid,ImgURL,Desc}=book
                        
                        return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                        
                    })
                    rating_data_strings=JSON.stringify(rating_data)

                    rating_data=ratingbooks.map(book=>{
                        const{Title,Bookid,ImgURL,Desc}=book
                        
                        return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                        
                    })
                    rating_data_strings=JSON.stringify(rating_data)
        
            return (

                <React.Fragment>
                    {ratingerror ?<p>{ratingerror.message}</p> : null}
                {ratinghasLoaded ?(    
                <div style={{ backgroundImage: `url(${BackgroundDiv})` }}>
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
                        {ratinghasLoaded ? (
                            <ReactExpandableGrid
                            gridData={rating_data_strings} />
                            ):(<Loader/>)}
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
                                <ReactExpandableGrid
                                gridData={rating_data_strings} />
                                </div>
                            <br></br>
                        <br></br>
                        <br></br>
                    </div>

                    <br></br>
                    <br></br>

                    <Footer></Footer>
                </div>
                ):(<Loader/>)}
                </React.Fragment>
            )
        } catch{
            alert("Login Again")
            return <Redirect to="/login" />
        }
    }
}