import React from "react";
import BackgroundImg from "../../img/3132.jpg";
import Footer from "../Footer/Footer"






export default function creativeteam(props) {


    return (
        <>
            <div style={{
                backgroundImage: `url(${BackgroundImg})`,
                height: "100vh",

            }}>

                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div style={{
                    margin: "30px",

                }}>
                    <h2><font color="#fead03" size="16"><center> About us </center></font></h2>
                    <br></br>
                    <br></br>


                    <font size="14" color="red"><b><u>Who are we?</u></b> </font><br></br><br></br><br></br>
                    <font size="8">
                        The New Chapter is a large site for readers and book recommendations. Our mission is to help people find and share books they love.
                    </font>
                    <br></br>
                    <br></br>


                    <br></br>
                    <br></br>

                    <font size="14" color="red"><b><u>A Few Things you can do on TNC </u></b> </font><br></br><br></br><br></br>
                    <font size="8   ">  Track the books you're reading, have read, and want to read.
                    Check out your personalized book recommendations.
                    Our recommendation engine analyzes 20 billion data points to give suggestions tailored to your literary tastes.
                    Recommend books to your friends.</font>

                    

                </div>
            </div>
                <Footer></Footer>


        </>
    )


}
