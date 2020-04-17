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
                            <div>
                                <ReactExpandableGrid /></div>
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
