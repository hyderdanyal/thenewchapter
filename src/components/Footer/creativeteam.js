import React from "react";
import BackgroundImg from "../../img/3132.jpg";
import Footer from "../Footer/Footer";






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
                    <h2><font color="#fead03" size="16"><center> Creative Team </center></font></h2>
                    <br></br>
                    <br></br>


                    <font size="14" color="red"><b><u>Project Members</u></b> </font><br></br><br></br><br></br>
                    <ul><font size="10">
                        <li>Danyal Hyder</li>
                        <li>Altaf Shaikh</li>
                        <li>Tanvi Satam</li>
                    </font></ul>
                    <br></br>
                    <br></br>


                    <br></br>
                    <br></br>

                    <font size="14" color="red"><b><u>Project Guide</u></b> </font><br></br><br></br><br></br>
                    <font size="10"> Prof. Vinod Alone </font>


                    <br></br>
                </div>
            </div>
                <Footer></Footer>


        </>
    )


}
