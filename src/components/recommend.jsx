import React from 'react';
import BackgroundDiv from "../img/divwood.jpg";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";

import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import LeftHeader from "../components/Header/leftheader";
/* eslint-disable react-hooks/rules-of-hooks */
import Carousel from "react-multi-carousel";
import Book1 from "../img/book1.jpg"
import Book2 from "../img/book2.jpg"
import Book3 from "../img/book3.jpg"
import Book4 from "../img/book4.jpg"
import Search from "../components/search"
import ReactExpandableGrid from "./Grid/ExpandableSlider";
import Rating from "react-rating"; 





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


export default function latest(props) {
    if (session.isValid === false) {
        alert('Please Login First!');
        return <Redirect to="/login" />
    }
    else {
        try {

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
                <>
                    <div style={{
                        backgroundImage: `url(${BackgroundDiv})`,
                        height: "100vh"
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
                            <h2><font color="#fead03"> Recommend a Book </font></h2>
                            <br></br>
                            <br></br>
                            <div style={{color:"#fead03"}}> 
                            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />

                                <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                fractions={2}
                                /></div>
                                <br></br><br></br><br></br><br></br>
                            <div style={{
                                height:'auto',
                                minHeight:'30vh',
                                width:'100%'
                            }}>
                                <Search style={{margin:'0 auto'}} />
                            </div>

                            <br></br>
                            <br></br>
                            <div >
                                <br></br>
                                <h2><font color="#fead03"> Recommended Books </font></h2>
                                <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>



                                {/* <Carousel responsive={responsive}
                                    swipeable={false}
                                    draggable={false}
                                    showDots={true}
                                    //autoPlay={true}
                                    //responsive={responsive}
                                    ssr={true} // means to render carousel on server-side.
                                    infinite={true}
                                    autoPlay={props.deviceType !== "mobile" ? true : false}
                                    autoPlaySpeed={1000}
                                    keyBoardControl={true}
                                    customTransition="all .8"
                                    transitionDuration={1800}
                                    containerClass="carousel-container"
                                    removeArrowOnDeviceType={["tablet", "mobile"]}
                                    deviceType={props.deviceType}
                                    dotListClass="custom-dot-list-style"
                                    itemClass="carousel-item-padding-40-px"
                                >
                                    <div>
                                        <img src={Book1} alt="" />
                                    </div>
                                    <div>
                                        <img src={Book2} alt="" />
                                    </div>
                                    <div>
                                        <img src={Book3} alt="" />
                                    </div>
                                    <div>
                                        <img src={Book4} alt="" />
                                    </div>
                                    <div>
                                        <img src={Book4} alt="" />
                                    </div>
                                    <div>
                                        <img src={Book4} alt="" />
                                    </div>
                                    <div>
                                        <img src={Book4} alt="" />
                                    </div>
                                </Carousel>; */}
                            <br></br>
                                <br></br>
                                <br></br>
                            </div>



                            <br></br>
                        </div>

                    </div>

                    <Footer></Footer>
                </>
            )
        } catch{
            alert("Login Again")
            return <Redirect to="/login" />
        }

    }
}