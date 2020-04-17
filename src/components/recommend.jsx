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
                            <h2><font color="babypink"> Recommend a Book </font></h2>
                            <br></br>
                            <br></br>

                            <Search />


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