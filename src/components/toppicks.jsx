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
                        <Carousel responsive={responsive}
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
                        </Carousel>;
                            <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03"> Recommended Books </font></h2>
                        <Carousel responsive={responsive}
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
                        </Carousel>;
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