import React from "react";
import BackgroundImg from "../../img/3132.jpg";
import Footer from "../Footer/Footer"







export default function privacy(props) {


    return (
        <>
            <div style={{
                backgroundImage: `url(${BackgroundImg})`,
                height: "100%",

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
                    <h2><font color="#fead03" size="16"><center> End User License Agreement </center></font></h2>
                    <br></br>
                    <br></br>


                    <font size="10" color="red"><b><u>General</u></b> </font><br></br><br></br><br></br>
                    <font size="6">
                        By using any Digital Work (Item) from The New Chapter , you agree that this End User User License Agreement (EULA) is a legally binding and valid contract and agree to be bound by it. You agree to abide by the intellectual property laws and all of the terms and conditions of this Agreement.

                        If you do not agree to be bound by this agreement, remove any Item from your computer now and, if applicable, promptly return to Creative Code SRL by mail any copies of the Item and related documentation and packaging in your possession.

                    </font>
                    <br></br>
                    <br></br>
                    <font size="10" color="red"><b><u>License Period</u></b> </font><br></br><br></br><br></br>
                    <font size="6"> An Item’s License is for the life time. That means, once you buy it, you can use the license forever within the restrictions described in this document. Each License includes between 6-months and 1-year of Premium Support, upgrades and access to private repositories to follow source code changes when needed. Please check this term for each License and also read the FAQ for more details.
                    </font>

                    <br></br>
                    <br></br>
                    <font size="10" color="red"><b><u>About this source code </u></b> </font><br></br><br></br><br></br>
                    <font size="6"> The New Chapter recommends books and redirects you to purchase those books. So, you can completely use it based on your requirements. Our items use many libraries, which are free and open source. If you need the source code of any library, you can just get it from its repository. So, there is no hidden code in that manner.
                     </font>
                    <br></br>
                    <br></br>
                    <font size="10" color="red"><b><u> Use of the license </u></b> </font><br></br><br></br><br></br>
                    <font size="6"> Your license to use any of our Items is limited to the number of licenses purchased by you. You shall not allow others to use, copy or evaluate copies of our Items.
                    </font>

                    <br></br>
                    <br></br>
                </div>
                <Footer></Footer>
            </div>


        </>
    )


}
