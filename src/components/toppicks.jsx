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

            var data=[
                { 'img': 'http://i.imgur.com/mf3qfzt.jpg', 'link': 'https://www.instagram.com/p/BQvy7gbgynF/', 'title': 'Elephants', 'description': 'Photo by @ronan_donovan // Two bull African elephants at dawn in Uganda\'s Murchison Falls National Park. See more from Uganda with @ronan_donovan.' },
            { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
            { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' },
            { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },
            { 'img': 'http://i.imgur.com/zIEjP6Q.jpg', 'link': 'https://www.instagram.com/p/BRFjVZtgSJD/', 'title': 'Westland Tai Poutini National Park', 'description': 'Photo by @christopheviseux / The Westland Tai Poutini National Park in New Zealand’s South Island offers a remarkable opportunity to take a guided walk on a glacier. A helicopter drop high on the Franz Josef Glacier, provides access to explore stunning ice formations and blue ice caves. Follow me for more images around the world @christopheviseux #newzealand #mountain #ice' },

            { 'img': 'http://i.imgur.com/rCrvQTv.jpg', 'link': 'https://www.instagram.com/p/BQ6_Wa2gmdR/', 'title': 'Dubai Desert Conservation Reserve', 'description': 'Photo by @christopheviseux / Early morning flight on a hot air balloon ride above the Dubai Desert Conservation Reserve. Merely an hour drive from the city, the park was created to protect indigenous species and biodiversity. The Arabian Oryx, which was close to extinction, now has a population well over 100. There are many options to explore the desert and flying above may be one of the most mesmerizing ways. Follow me @christopheviseux for more images from the Middle East. #dubai #desert' }
        ]
        var data_strings=JSON.stringify(data)

        
            return (

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
                                <ReactExpandableGrid
                                gridData={data_strings} />
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
                                gridData={data_strings} />
                                </div>
                            <br></br>
                        <br></br>
                        <br></br>
                    </div>

                    <br></br>
                    <br></br>

                    <Footer></Footer>
                </div>
            )
        } catch{
            alert("Login Again")
            return <Redirect to="/login" />
        }
    }
}