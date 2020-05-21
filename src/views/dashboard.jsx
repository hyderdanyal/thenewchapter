/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import firebase from "../firebase";
import BackgroundDiv from "../img/divwood.jpg";
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import TypedR from "../Styles/typed";
import Footer from "../components/Footer/Footer";
import LeftHeader from "../components/Header/leftheader";
import "react-multi-carousel/lib/styles.css";
import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import "../Styles/styling.css";
import cfl from '../img/cfl.jpg';
import { useEffect } from "react";
import { useState } from "react";
import Loader from '../components/loader'
import Slider from '../components/Slider/components/NetflixSlider'
import _ from 'underscore'






// const responsive = {
//     superLargeDesktop: {
//         // the naming can be any, depends on you.
//         breakpoint: { max: 4000, min: 3000 },
//         items: 5,
//     },
//     desktop: {
//         breakpoint: { max: 3000, min: 1024 },
//         items: 5,
//     },
//     tablet: {
//         breakpoint: { max: 1024, min: 464 },
//         items: 2,
//     },
//     mobile: {
//         breakpoint: { max: 464, min: 0 },
//         items: 1,
//     },
// };

const session = Session.get();
var tag_data

var datas

var rating_data

var mf_data

var myListBooks = []

var item

var myListTitle

var myListId



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
            const [userId] = useState(0)
            const [state, setState] = useState({
                hasLoaded: false,
                books: [],
                error: null
            })

            const [tagState, setTagState] = useState({
                taghasLoaded: false,
                tagbooks: [],
                tagerror: null
            })

            const [ratingState, setRatingState] = useState({
                ratinghasLoaded: false,
                ratingbooks: [],
                ratingerror: null
            })

            const [mfState, setMfState] = useState({
                mfhasLoaded: false,
                mfbooks: [],
                mferror: null
            })




            function fetchBooksAuthor(item) {

                fetch(`http://127.0.0.1:5000/authorbased?Title=${item}`)
                    .then(response => response.json())
                    .then((data) => {

                        setState({
                            books: data,
                            hasLoaded: true
                        })

                    })
                    .catch(error => setState({
                        error,
                        hasLoaded: true
                    }))


            }


            const { hasLoaded, books, error } = state

            function fetchBooksTag(item) {

                fetch(`http://127.0.0.1:5000/tagbased?Title=${item}`)
                    .then(response => response.json())
                    .then((data) => {

                        setTagState({
                            tagbooks: data,
                            taghasLoaded: true
                        })

                    })
                    .catch(tagerror => setTagState({
                        tagerror,
                        taghasLoaded: true
                    }))


            }



            function fetchBooksRating() {

                fetch("http://127.0.0.1:5000/ratingbased")
                    .then(response => response.json())
                    .then((data) => {

                        setRatingState({
                            ratingbooks: data,
                            ratinghasLoaded: true
                        })

                    })
                    .catch(ratingerror => setRatingState({
                        ratingerror,
                        ratinghasLoaded: true
                    }))


            }

            function fetchBooksMf() {
                let uid = firebase.getCurrentUID()
                fetch(`http://127.0.0.1:5000/matrixfactorization?uid=${uid}`)
                    .then(response => response.json())
                    .then((data) => {

                        setMfState({
                            mfbooks: data,
                            mfhasLoaded: true
                        })

                    })
                    .catch(mferror => setMfState({
                        mferror,
                        mfhasLoaded: true
                    }))


            }

            const { ratinghasLoaded, ratingbooks } = ratingState

            const { taghasLoaded, tagbooks } = tagState

            const { mfhasLoaded, mfbooks } = mfState
            var [empty, setEmpty] = useState(Boolean)
            function conditionalChaining(value) {
                if (value) {
                    myListBooks = value.map(book => {
                        const { Title, Bookid, ImgURL, Desc } = book
                        return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }

                    })
                    let bookname = myListBooks.map(book => {
                        return { id: book.id, title: book.title }
                    })
                    item = bookname[Math.floor(Math.random() * bookname.length)];
                    myListId = item.id
                    myListTitle = item.title
                    setEmpty(false)
                    fetchBooksAuthor(myListId)
                    fetchBooksTag(myListId)
                }
            }
            useEffect(() => {
                firebase.readMyList(firebase.getCurrentUID(), firebase.getCurrentUsername())
                    .then(conditionalChaining).catch(() => {
                        myListTitle = 'My List Empty'
                        fetchBooksAuthor('5763')
                        fetchBooksTag('5763')
                        setEmpty(true)
                    })
                fetchBooksRating()
                fetchBooksMf()
            }, [userId])
            datas = books.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }


            })


            tag_data = tagbooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }

            })


            rating_data = ratingbooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }

            })


            mf_data = mfbooks.map(book => {
                const { Title, Bookid, ImgURL, Desc } = book

                return { id: Bookid, image: ImgURL, 'link': `https://www.amazon.in/s?k=${Title}&i=stripbooks`, title: Title, desc: Desc, imageBg: ImgURL }

            })



            return (

                <React.Fragment>
                    {error ? <p>{error.message}</p> : null}
                    {hasLoaded ? (
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
                                        <br></br>
                                        <p> We find ourselves lucky to have you on-board with us .</p>
                                        <p> We at The New Chapter provide great book recommendations and try our best to convince you'll to come again.</p>
                                        <br></br>
                                        <br></br>
                                        <br></br>
                                        <TypedR
                                            strings={[
                                                "<font color='#141a46' size='6px'><strong>Let's</font><br><br><strong><font color='#ec8b5e' size='7px'><i>READ,</i></font></strong>",
                                                "<font color='#141a46' size='6px'><strong>Let's</font><br><br><strong><font color='#ec8b5e' size='7px'><i>DISCOVER!</i></font></strong>"
                                            ]}></TypedR>
                                    </div>
                                </div>



                            </div>
                            <br></br>
                            <br></br>
                            <div >
                                <br></br>
                                {empty ? (null) : (<>
                                    <h2><font color="#fead03">My List </font></h2>
                                    <div>
                                        {hasLoaded ? (
                                            <Slider>
                                                {}
                                                {myListBooks.map(rating_data => (
                                                    <Slider.Item movie={rating_data} key={rating_data.id}>item1</Slider.Item>
                                                ))}
                                            </Slider>
                                        ) : (<Loader />)}
                                    </div>
                                </>
                                )}

                                <br></br>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div style={{ height: 'auto' }}>
                                <h2><font color="#fead03">Author Based >   {myListTitle}  </font></h2>


                                <div>

                                    {hasLoaded ? (
                                        <Slider>
                                            {datas.map(datas => (
                                                <Slider.Item movie={datas} key={datas.id}>item1</Slider.Item>
                                            ))}
                                        </Slider>

                                    ) : (<Loader />)}
                                </div>
                                <br></br>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div >
                                <br></br>
                                <h2><font color="#fead03">Featured For You </font></h2>
                                <div>
                                    {mfhasLoaded ? (
                                        <Slider>
                                            {mf_data.map(mf_data => (
                                                <Slider.Item movie={mf_data} key={mf_data.id}>item1</Slider.Item>
                                            ))}
                                        </Slider>

                                    ) : (null)}

                                </div>
                                <br></br>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div >
                                <br></br>
                                <h2><font color="#fead03">Trending Now </font></h2>
                                <div>
                                    {ratinghasLoaded ? (
                                        <Slider>
                                            {rating_data.map(rating_data => (
                                                <Slider.Item movie={rating_data} key={rating_data.id}>item1</Slider.Item>
                                            ))}
                                        </Slider>

                                    ) : (<Loader />)}

                                </div>
                                <br></br>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>

                            <div >
                                <br></br>
                                <h2><font color="#fead03"> Tag Based >   {myListTitle}</font></h2>
                                <div>
                                    {taghasLoaded ? (
                                        <Slider>
                                            {tag_data.map(tag_data => (
                                                <Slider.Item movie={tag_data} key={tag_data.id}>item1</Slider.Item>
                                            ))}
                                        </Slider>
                                    ) : (<Loader />)}
                                </div>
                                <br></br>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>

                            <Footer ></Footer>
                        </div>
                    ) : (<Loader />)}
                </React.Fragment>

            )
        } catch (error) {
            console.log(error)


            return <Loader />
        }
    }
}