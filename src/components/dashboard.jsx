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
console.log("asasa", session.isValid);
console.log(payload);

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
                                <p> We find ourselves lucky to have you on-board with us .</p>
                                <br></br>
                                <br></br>
                                <TypedR
                                    strings={[
                                        "<font color='#141a46' size='6'><strong>Let's</font><br><strong><font color='#ec8b5e' size='11px'><i> READ,</i></font></strong>",
                                        "<font color='#141a46' size='6'><strong>Let's</font><br><strong><font color='#ec8b5e' size='11px'><i> DISCOVER!</i></font></strong>"
                                    ]}></TypedR>
                            </div>
                        </div>



                    </div>
                    <br></br>
                    <br></br>
                    <div >
                        <h2><font color="#fead03">My List </font></h2>
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
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Trending Now </font></h2>
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
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Top 10 </font></h2>
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
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Because You Read Corona! </font></h2>
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

                    <Footer ></Footer>
                </div>


            )
        } catch{
            alert("Login Again please")

            return <Redirect to="/login" />
        }
    }
}