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
import Slider from './Slider/components/NetflixSlider'





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
var myListBooks=[]

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

            const [myList,setMyList]=useState({
                hasLoaded:false
            })

            const [ratingState,setRatingState]=useState({
                ratinghasLoaded:false,
                ratingbooks:[],
                ratingerror:null
            })
            const [userId,setUserId]=useState(0)
            const {ratinghasLoaded,ratingbooks,ratingerror}=ratingState
                                                      
                                            function fetchBooksRating(){
                        
                                                fetch("http://127.0.0.1:5000/ratingbased")
                                                        .then(response=>response.json())
                                                        .then((data)=>{
                                                            // console.log(data)
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
                                                                firebase.readMyList(firebase.getCurrentUID(),firebase.getCurrentUsername())
                                                                .then((response)=>{
                                                                    // console.log(response)
                                                                    myListBooks=response.map(book=>{
                                                                        const{Title,Bookid,ImgURL,Desc}=book
                                                                        
                                                                        return {id:Bookid,image:ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,title:Title,desc:Desc,imageBg:ImgURL}
                                                                        
                                                                    })
                                                                   setMyList({hasLoaded:true})
                                                                    // console.log(myListBooks)
                                                                })
                                                                
                                                                
                                                            },[userId])
                                                            // console.log(myList)


            rating_data=ratingbooks.map(book=>{
                        const{Title,Bookid,ImgURL,Desc}=book
                        
                        return {id:Bookid,image:ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,title:Title,desc:Desc,imageBg:ImgURL}
                        
                    })
                    rating_data_strings=JSON.stringify(rating_data)

                    // rating_data=ratingbooks.map(book=>{
                    //     const{Title,Bookid,ImgURL,Desc}=book
                        
                    //     return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                        
                    // })
                    // rating_data_strings=JSON.stringify(rating_data)
       const {hasLoaded}=myList
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
                        {hasLoaded ? (
                        <Slider>
                        {}
                        {myListBooks.map(rating_data => (
                        <Slider.Item movie={rating_data} key={rating_data.id}>item1</Slider.Item>
                         ))}
                            </Slider>    
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
                        <Slider>
                            {rating_data.map(rating_data => (
                            <Slider.Item movie={rating_data} key={rating_data.id}>item1</Slider.Item>
                            ))}
                            </Slider> 
                                {/* <ReactExpandableGrid
                                gridData={rating_data_strings} /> */}
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