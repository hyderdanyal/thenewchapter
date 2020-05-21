/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/HeaderLinks";
import styles from "../Styles/homeStyle";
import Footer from "../components/Footer/Footer";
import Background from "../img/home.jpg";
import { Button } from "@material-ui/core";
import TypedR from "../Styles/typed"
import BackgroundDiv from "../img/divlakda.jpg";
import "react-multi-carousel/lib/styles.css";
import { Link, Redirect } from "react-router-dom";
import { Session } from "bc-react-session";
import "../Styles/homestyle.css";
import BookGif from "../img/bookgif.gif";
import GenreImg from "../img/genrecss.png";


const useStyles = makeStyles(styles);

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
              <br></br><br></br><br></br>
              <h3 className={classes.subtitle} >We at THE NEW CHAPTER provide with promising book recommendations for individuals from a huge set of authors working on different genres using machine learning algorithms to keep our users rejoicing. </h3>
              <br></br>

              <Link to='/login'><button class="button" size="lg"
                href="/login"


              // target="_blank"
              >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Try it !
                    </button>
              </Link>
            </div>
            <div class="bookgif" style={{ width: "50%", display: "grid", alignContent: "center" }} >
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
              <br></br>
              <br></br>


              <div class="wrapper" style={{ width: "100%", height: "100%" }}>
                <ul class="stage clearfix">

                  <li class="scene">
                    <div class="movie" >
                      <div class="poster"></div>
                      <div class="info">
                        <h1><br></br>Curious George Rides a Bike</h1>
                        <span class="author"><br></br>H. A. Rey and Margret Rey</span>
                        <br></br>
                        <span class="rating">4.25</span>
                        <br></br>
                        <span class="genre">Childrens</span>
                        <p>
                          Today is a special day for George because he gets his first bike. He does tricks, he helps the paper boy with his round and then he sees a river... and George is curious. And that's when his exciting adventure begins.
								</p>
                        <Button href="\login" style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book ->  </Button>
                      </div>
                    </div>
                  </li>

                  <li class="scene">
                    <div class="movie">
                      <div class="poster"></div>
                      <div class="info">
                        <h1><br></br>Sapphique</h1>
                        <span class="author"><br></br>Catherine Fisher</span><br></br>
                        <span class="rating">3.7</span><br></br>
                        <span class="genre">Fiction</span>
                        <p>
                          Incarceron, the living prison, has lost one of its inmates to the outside world: Finn's escaped, only to find that Outside is not at all what he expected. Used to the technologically advanced, if violently harsh, conditions of the prison, Finn is now forced to obey the rules of Protocol, which require all people to live without technology. To Finn, Outside is just a prison of another kind, especially when Claudia, the daughter of the prison's warden, declares Finn the lost heir to the throne.
								</p>
                        <Button href="\login" style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>

                  <li class="scene">
                    <div class="movie" >
                      <div class="poster"></div>
                      <div class="info">
                        <h1><br></br> It's A Magical World</h1>
                        <span class="author"><br></br> Bill Watterson</span><br></br>
                        <span class="rating">4.76</span><br></br>
                        <span class="genre">Comics</span>
                        <p>
                          It's a Magical World includes full-color Sundays and has it all: Calvin-turned-firefly waking Hobbes with his flashlight glow; courageous Spaceman Spiff rocketing through alien galaxies as he battles Dad-turned-Bug-Being; and Calvin's always inspired snowman art. There's no better way for Watterson fans to savor again the special qualities of their favorite strip.
								</p>
                        <Button href="\login" style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>
                  <li class="scene">
                    <div class="movie" >
                      <div class="poster"></div>
                      <div class="info">
                        <h1><br></br>The Pearl That Broke Its Shell</h1>
                        <span class="author">Nadia Hashimi</span><br></br>
                        <span class="rating">4.14</span><br></br>
                        <span class="genre">Fiction</span>
                        <p>
                          Afghan-American Nadia Hashimi's literary debut novel, The Pearl that Broke Its Shell is a searing tale of powerlessness, fate, and the freedom to control one's own fate that combines the cultural flavor and emotional resonance of the works of Khaled Hosseini, Jhumpa Lahiri, and Lisa See.
								</p>
                        <Button href="\login" style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
                      </div>
                    </div>
                  </li>

                  <li class="scene">
                    <div class="movie" >
                      <div class="poster"></div>
                      <div class="info">
                        <h1><br></br> Like the Flowing River </h1>
                        <span class="author"><br></br> Paulo Coelho</span><br></br>
                        <span class="rating">3.92</span><br></br>
                        <span class="genre">Inspirational</span>
                        <p>
                          'Like the Flowing River' includes jewel-like fables, packed with meaning and retold in Coelho's inimitable style. Sharing his thoughts on spirituality, life and ethics, Paulo touches you with his philosophy and invites you to go on an exciting journey of your own.
								</p>
                        <Button href="\login" style={{ borderRadius: "12px", background: "#ff0047" }}> Get your book -> </Button>
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
              <br></br><br></br><br></br>
              <h2 style={{ textAlign: "right", margin: "25px" }}> We have <i><b>10000</b></i> books of <i><b>230</b></i> genres. </h2>
              <br></br>
              <Link to='/login'><button class="button" size="lg"



              // target="_blank"
              >
                <span ></span>
                <span></span>
                <span></span>
                <span></span>
                Try it !
                    </button>
              </Link>
            </div>

          </div>

        </div>
        <Footer style={{ position: "relative", backgroundColor: "black", color: "#fead03" }} />
      </div >

    );

  }

}






















