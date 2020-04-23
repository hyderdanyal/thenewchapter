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
import ReactExpandableGrid from "./Grid/ExpandableGrid";


const session = Session.get();


export default function latest(props) {
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
                <>
                    <div style={{
                        backgroundImage: `url(${BackgroundDiv})`,
                        height: "130vh"
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
                            <h2><font color="#fead03"> Latest Books </font></h2>
                            <div >
                                <ReactExpandableGrid
                                gridData={data_strings} />
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












// <GridContainer>
//     <Link to='/dashboard'>
//         <GridItem>
//             <img src={Book1} alt='' />
//         </GridItem>
//     </Link>
//     <GridItem>
//         <img src={Book2} alt='' />
//     </GridItem>
//     <GridItem>
//         <img src={Book3} alt="" />
//     </GridItem>
//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>

//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>
//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>
//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>
//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>
//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>
//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>
//     <GridItem>
//         <img src={Book4} alt='' />
//     </GridItem>
// </GridContainer>
//     <Gallery style={{ width: "100%" }} images={IMAGES} />
