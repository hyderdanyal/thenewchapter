/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Header from "./Header/Header";
import HeaderLinks from "./Header/HeaderLinks";
import styles from "../Styles/homeStyle";
import Footer from "../components/Footer/Footer";
import Background from "../img/home.jpg";
import { Button } from "@material-ui/core";
import TypedR from "../Styles/typed"
import BackgroundDiv from "../img/divlakda.jpg";
import "react-multi-carousel/lib/styles.css";
import { Redirect } from "react-router-dom";
import { Session } from "bc-react-session";
import "../Styles/homestyle.css";
import BookGif from "../img/bookgif.gif";
import GenreImg from "../img/genrecss.png";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
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
const useStyles = makeStyles(styles);
//KALYE
const session = Session.get();


export default function Components(props) {
  if (session.isValid === true) {

    return <Redirect to="/dashboard" />
  }
  else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();
    const { ...rest } = props;





    return (



      <div>

        <div style={{ backgroundColor: "black" }}>

          <Header
            brand="The New Chapter"

            rightLinks={<HeaderLinks />}
            fixed
            color="transparent"
            changeColorOnScroll={{
              height: 400,
              color: "white"
            }}
            {...rest}
          />
          <div>


            <div className="a"
              style={{
                height: "100vh",
                width: "100%",
                maxHeight: "1000px",
                overflow: "hidden",
                position: "relative",
                backgroundPosition: "center center",
                backgroundSize: "cover",
                margin: "0",
                padding: "0",
                border: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                backgroundImage: `url(${Background})`,
                backgroundRepeat: "no-repeat"

              }}>




              <div className={classes.typed}  >
                <TypedR
                  strings={[
                    'T O D A Y   A   <strong><font color="#00fbfe"><i>R E A D E R !</i></font></strong>',
                    'T O M O R R O W   A   <strong><font color="#00fbfe"><i>L E A D E R !</i></font></strong>'
                  ]}></TypedR>
              </div>
              <section class="section2"  >
                <div class="scrolldown">
                  <span class="spanscroll"></span>
                  <span class="spanscroll"></span>
                  <span class="spanscroll"></span>
                </div>
              </section>


            </div>

          </div>
          <br></br>


          <div className={classes.container}
            style={{
              height: "50vh",
              width: '100',
              maxHeight: "1000px",
              overflow: "hidden",
              position: "relative",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              margin: "0",
              padding: "0",
              border: "0",
              display: "flex",
              backgroundImage: `url(${BackgroundDiv})`,


            }}>

            <div style={{ color: "yellow", paddingLeft: "10%", width: "50%", justifyContent: "center" }} className="b">
              <h3 className={classes.title}>Don't know what to read? </h3>
              <h3 className={classes.subtitle} >We at THE NEW CHAPTER provide with promising book recommendations for individuals from a huge set of authors working on different genres using machine learning algorithms to keep our users rejoicing. </h3>
              <br></br>

              <button class="button" size="lg"
                href="/register"


              // target="_blank"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Try it !
                    </button>
            </div>
            <div style={{ width: "50%", display: "grid", alignContent: "center" }} >
              <img style={{
                position: "relative",
                margin: "0 auto",
                alignSelf: "right",
                paddingRight: "10%",

              }
              } src={BookGif} alt=""></img>
            </div>
          </div>
          <br></br>

          <div className={classes.container}
            style={{
              height: "70vh",
              maxHeight: "1000px",
              overflow: "hidden",
              position: "relative",
              backgroundPosition: "center center",
              backgroundSize: "cover",

              margin: "0",
              padding: "0",
              border: "0",
              display: "flex",
              backgroundImage: `url(${BackgroundDiv})`,


            }}>

            <div style={{ color: "yellow" }} className={classes.brand}>
              <h3 className={classes.title}>Top Picks</h3>
              <br></br>


              <div class="wrapper" style={{width:"100%",height:"100%"}}>
                <ul class="stage clearfix">

                  <li class="scene">
                    <div class="movie" onClick="return true">
                      <div class="poster"></div>
                      <div class="info">
                        <h1>It's a Wonderful Life</h1>
                        <span class="author">Kamlesh</span>
                        <br></br>
                        <span class="rating">5</span>
                        <br></br>
                        <span class="genre">Romance</span>
                        <p>
                          In Bedford Falls, New York on Christmas Eve, George Bailey is deeply troubled. Prayers for his well-being from friends and family reach Heaven. Clarence Odbody, Angel Second Class, is assigned to visit Earth to save George, thereby earning his wings. Franklin and Joseph, the head angels, review George's life with Clarence.
								</p>
                        <Button style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>

                  <li class="scene">
                    <div class="movie" onClick="return true">
                      <div class="poster"></div>
                      <div class="info">
                        <h1>Vengeance Valley</h1>
                        <span class="author">Rupesh</span><br></br>
                        <span class="rating">4.5</span><br></br>
                        <span class="genre">Action</span>
                        <p>
                          A cattle baron takes in an orphaned boy and raises him, causing his own son to resent the boy. As they get older the resentment festers into hatred, and eventually the real son frames his stepbrother for fathering an illegitimate child that is actually his, seeing it as an opportunity to get his half-brother out of the way so he can have his father's empire all to himself.
								</p>
                        <Button style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>

                  <li class="scene">
                    <div class="movie" onClick="return true">
                      <div class="poster"></div>
                      <div class="info">
                        <h1>The Gold Rush</h1>
                        <span class="author">Ramesh</span><br></br>
                        <span class="rating">4</span><br></br>
                        <span class="genre">comedy</span>
                        <p>
                          The Tramp travels to the Yukon to take part in the Klondike Gold Rush. He gets mixed up with some burly characters and falls in love with the beautiful Georgia. He tries to win her heart with his singular charm.
								</p>
                        <Button style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>
                  <li class="scene">
                    <div class="movie" onClick="return true">
                      <div class="poster"></div>
                      <div class="info">
                        <h1>Conor</h1>
                        <span class="author">Suresh</span><br></br>
                        <span class="rating">4.5</span><br></br>
                        <span class="genre">lifestyle</span>
                        <p>
                          After killing a young girl, a young firefighter battles his own mind and society to regain his unborn child. Conor is a novel evocative of the thin veil lying between sanity and madness, and the tragedy of a broken love story and a rebirth from society's forgotten dregs of a broken man, rejected by family, friends, and peers, forced to break his own rules and deny his own upbringing to find love and freedom once more.
								</p>
                        <Button style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>

                  <li class="scene">
                    <div class="movie" onClick="return true">
                      <div class="poster"></div>
                      <div class="info">
                        <h1>The Job</h1>
                        <span class="author">Ganesh</span><br></br>
                        <span class="rating">4</span><br></br>
                        <span class="genre">Country</span>
                        <p>
                          With these four syllables, delivered in an unmistakably authentic New York accent, Steve Osborne has riveted thousands of people through the legendary storytelling outfit The Moth (and over a million times on their website) with his hilarious, profane, and touching tales from his twenty years served as an NYPD street cop.
								</p>
                        <Button style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>


                </ul>
              </div>



              <br></br>
            </div>

          </div>
          <br></br>
          <div className={classes.container}
            style={{
              height: "50vh",
              maxHeight: "1000px",
              overflow: "hidden",
              position: "relative",
              backgroundPosition: "center center",
              backgroundSize: "cover",
              margin: "0",
              padding: "0",
              border: "0",
              display: "flex",
              backgroundImage: `url(${BackgroundDiv})`,


            }}>
            <div style={{ width: "50%", display: "grid", left: "10px", textAlign: "left" }} >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img style={{
                position: "relative",
                margin: "0 auto",
                alignSelf: "right",
                paddingRight: "10%",
                height: "300px",
                width: "600px",
                bottom: "1px"

              }
              } src={GenreImg} alt=""></img>
              <h1 class="h1" > <span class="spanvalue"></span></h1>
            </div>

            <div style={{ color: "yellow", textAlign: "right", width: "50%", paddingRight: "10%" }} className="c">
              <h3 className={classes.title} style={{ textAlign: "right" }}>Genres </h3>

              <h2 style={{ textAlign: "right", margin:"25px" }}> We have <i><b>17863</b></i> books of <i><b>412</b></i> genres. </h2>
              <br></br>
              <button class="button" size="lg"
                href="/register"


              // target="_blank"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Try it !
                    </button>
            </div>

          </div>
          <br></br>

        </div>
        <Footer style={{ position: "relative", backgroundColor: "black", color: "#fead03" }} />
      </div >

    );

  }

}






















