/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import firebase from "../firebase";
import BackgroundDiv from "../img/divwood.jpg";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import TypedR from "../Styles/typed";
import Footer from "../components/Footer/Footer";
import LeftHeader from "../components/Header/leftheader";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Book1 from "../img/book1.jpg"
import Book2 from "../img/book2.jpg"
import Book3 from "../img/book3.jpg"
import Book4 from "../img/book4.jpg"

import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import "../Styles/styling.css";
import cfl from '../img/cfl.jpg';
import ReactExpandableGrid from "./Grid/ExpandableSlider";
import { useEffect } from "react";
import { useState } from "react";





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
const payload = Session.get();


export default function dashboard(props) {
    if (session.isValid === false) {
        alert('Please Login First!');
        firebase.logout()
        Session.destroy()
        return <Redirect to="/login" />
    }
    else {
        try {

            if (!firebase.getCurrentUsername()) {
                alert('Please Login First')
                props.history.replace('/login')
                return null
            }

            var datas=[
                { 'img': 'http://i.imgur.com/mf3qfzt.jpg', 'link': 'https://www.instagram.com/p/BQvy7gbgynF/', 'title': 'Elephants', 'description': 'Photo by @ronan_donovan // Two bull African elephants at dawn in Uganda\'s Murchison Falls National Park. See more from Uganda with @ronan_donovan.' },
                { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
                { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' },
                { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
                { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
                
                { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' }
            ]
            
            const [state,setState]=useState({
                hasLoaded:false,
                books:[],
                error:null
            })
            function fetchBooks(){
        
                fetch("http://127.0.0.1:5000/authorbased?Title=The Hobbit")
                        .then(response=>response.json())
                        .then((data)=>{
                            
                            setState({
                                books:data,
                                hasLoaded:true
                            })
                            
                        })
                        .catch(error=>setState({
                            error,
                            hasLoaded:true}))
                        
            }
            useEffect(()=>fetchBooks())

            var data_strings=JSON.stringify(datas)
            
        //    useEffect(()=>{
        //         console.log("INSIDE")
        //         fetch("http://127.0.0.1:5000/authorbased?Title=The Hobbit")
        //         .then(results=>{
        //             return results.json()
        //             // return (results.json(), console.log("RESULTS",results))
        //         }).then(data=>{
        //             data.results.map((bTitle)=>{
        //                 return(console.log(bTitle.Title))
        //             })
                    
        //             return console.log("Set",data)
        //         })
        //     })            
            

            const{hasLoaded,books,error}=state
            
            return (
                <React.Fragment>
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

                    <div className='a'
                        style={{
                            height: "70vh",
                            width: '100%',
                            maxHeight: '1000px',
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundPosition: "center center",
                            backgroundSize: 'cover',
                            margin: '0',
                            padding: '0',
                            border: "0",
                            display: "flex",
                            alignItems: "center",

                            backgroundImage: `url(${BackgroundDiv})`,
                            backgroundRepeat: "no-repeat"

                        }}>
                          
                        <div class='card'
                        >
                            <div class='imgBox'>
                                <img style={{ height: '400px', width: '300px' }} src={cfl} alt=''></img>
                            </div>
                            <div class='details'><p>Hello {firebase.getCurrentUsername().toUpperCase()}, </p>
                            <br></br>
                                <p> We find ourselves lucky to have you on-board with us .</p>
                                <p> We at The New Chapter provide great book recommendations and try our best to convince you'll to come again.</p>
                                <br></br>
                                <br></br>
                                <br></br>
                                <TypedR
                                    strings={[
                                        "<font color='#141a46' size='6px'><strong>Let's</font><br><br><strong><font color='#ec8b5e' size='7px'><i>READ,</i></font></strong>",
                                        "<font color='#141a46' size='6px'><strong>Let's</font><br><br><strong><font color='#ec8b5e' size='7px'><i>DISCOVER!</i></font></strong>"
                                    ]}></TypedR>
                            </div>
                        </div>



                    </div>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03">My List </font></h2>
                        <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <div style={{height:'auto'}}>
                        <h2><font color="#fead03">Author Based Recommendation </font></h2>
                       
                            
                        
                            {hasLoaded ?( 
                                books.map(book=>{
                                    const{Title,Bookid,ImgURL}=book

                                    datas=[{'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title}]
                                    var data_strings=JSON.stringify(datas)
                                    
                                    return(
                                     <ReactExpandableGrid key={Bookid}
                                     gridData={data_strings} />
                                )
                            })
                            ):<p></p>}
                                
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Trending Now </font></h2>
                        <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Top 10 </font></h2>
                        <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Because You Read Corona! </font></h2>
                        <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <Footer ></Footer>
                </div>
                </React.Fragment>

            )
        } catch{
            alert("Login Again please")

            return <Redirect to="/login" />
        }
    }
}