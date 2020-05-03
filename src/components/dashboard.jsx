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
import ReactExpandableGrid from "./Grid/ExpandableSlider";
import { useEffect } from "react";
import { useState } from "react";
import Loader from './loader'
// import { Title } from "@material-ui/icons";






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
var tag_data_strings
var datas
var data_strings
var rating_data
var rating_data_strings
var mf_data
var mf_data_strings



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
            
            const [state,setState]=useState({
                hasLoaded:false,
                books:[],
                error:null
            })
            
            const [tagState,setTagState]=useState({
                taghasLoaded:false,
                tagbooks:[],
                tagerror:null
            })

            const [ratingState,setRatingState]=useState({
                ratinghasLoaded:false,
                ratingbooks:[],
                ratingerror:null
            })

            const [mfState,setMfState]=useState({
                mfhasLoaded:false,
                mfbooks:[],
                mferror:null
            })
            
            const[author,setAuthor]=useState({authorBook:[]})
            function fetchBooksAuthor(){
        
                fetch("http://127.0.0.1:5000/authorbased?Title=The Hobbit")
                        .then(response=>response.json())
                        .then((data)=>{
                            
                            setState({
                                books:data,
                                hasLoaded:true
                            })
                            
                        })
                        .catch(error=>setState({
                            error,
                            hasLoaded:true}))
                            
                            
                        }
                        //     })            
                            // var datas
                            // var data_strings
                
                            const{hasLoaded,books,error}=state
                          
                            function fetchBooksTag(){
        
                                fetch("http://127.0.0.1:5000/tagbased?Title=The Hobbit")
                                        .then(response=>response.json())
                                        .then((data)=>{
                                            
                                            setTagState({
                                                tagbooks:data,
                                                taghasLoaded:true
                                            })
                                            
                                        })
                                        .catch(tagerror=>setTagState({
                                            tagerror,
                                            taghasLoaded:true}))
                                            
                                            
                                        }
                                
                            // const{ratinghasLoaded,ratingbooks,ratingerror}=ratingState
                                                      
                                            function fetchBooksRating(){
                        
                                                fetch("http://127.0.0.1:5000/ratingbased")
                                                        .then(response=>response.json())
                                                        .then((data)=>{
                                                            
                                                            setRatingState({
                                                                ratingbooks:data,
                                                                ratinghasLoaded:true
                                                            })
                                                            
                                                        })
                                                        .catch(ratingerror=>setRatingState({
                                                            ratingerror,
                                                            ratinghasLoaded:true}))
                                                            
                                                            
                                                        }
                                                
                                                        function fetchBooksMf(){
                                                            let uid=firebase.getCurrentUID()    
                                                            fetch(`http://127.0.0.1:5000/matrixfactorization?uid=${uid}`)
                                                                    .then(response=>response.json())
                                                                    .then((data)=>{
                                                                        
                                                                        setMfState({
                                                                            mfbooks:data,
                                                                            mfhasLoaded:true
                                                                        })
                                                                        
                                                                    })
                                                                    .catch(mferror=>setMfState({
                                                                        mferror,
                                                                        mfhasLoaded:true}))
                                                                        
                                                                        
                                                                    }
                                                
                                                            const{ratinghasLoaded,ratingbooks,ratingerror}=ratingState

                                                            const{taghasLoaded,tagbooks,tagerror}=tagState

                                                            const{mfhasLoaded,mfbooks,mferror}=mfState

             useEffect(()=>{
                fetchBooksAuthor()
                fetchBooksTag()
                fetchBooksRating()
                fetchBooksMf()
            })
                    datas=books.map(book=>{
                        const{Title,Bookid,ImgURL,Desc}=book
                        
                        return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                        
                        // setAuthor({authorBook:data_strings})
                        
                        
                        // setState({hasLoaded:true})
                        
                        // console.log("DATASTRINGS",author.authorBook)
                    })
                    data_strings=JSON.stringify(datas)
                    
                    tag_data=tagbooks.map(book=>{
                        const{Title,Bookid,ImgURL,Desc}=book
                        
                        return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                        
                    })
                    tag_data_strings=JSON.stringify(tag_data)

                    rating_data=ratingbooks.map(book=>{
                        const{Title,Bookid,ImgURL,Desc}=book
                        
                        return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                        
                    })
                    rating_data_strings=JSON.stringify(rating_data)
                    
                    mf_data=mfbooks.map(book=>{
                        const{Title,Bookid,ImgURL,Desc}=book
                        
                        return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                        
                    })
                    mf_data_strings=JSON.stringify(mf_data)
                    

            return (
                
                <React.Fragment>
                    {error ?<p>{error.message}</p> : null}
                {hasLoaded ?(    
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
                        <h2><font color="#fead03">My List </font></h2>
                        <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    
                    <div style={{height:'auto'}}>
                        <h2><font color="#fead03">Author Based Recommendation </font></h2>
                       
                            
                        <div>
                            {/* {hasLoaded ?( 
                                books.map(book=>{
                                    const{Title,Bookid,ImgURL,Desc}=book
                                    
                                    datas=[{'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc},]
                                    var data_strings=JSON.stringify(datas)
                                    
                                    return(
                                        <ReactExpandableGrid key={Bookid}
                                     gridData={data_strings} />
                                    )
                                })
                                
                            ):<p></p>} */}
                            {taghasLoaded ? (
                            <ReactExpandableGrid
                            gridData={tag_data_strings} />
                            ):(<Loader/>)}
                             </div>   
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Matrix Factorization </font></h2>
                        <div>
                        {mfhasLoaded ? (
                            <ReactExpandableGrid
                            gridData={mf_data_strings} />
                            ):(<Loader/>)}
                                
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
                            <ReactExpandableGrid
                            gridData={rating_data_strings} />
                            ):(<Loader/>)}
                                
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Top Books </font></h2>
                        <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div >
                        <br></br>
                        <h2><font color="#fead03">Because You Read Corona! </font></h2>
                        <div>
                                <ReactExpandableGrid
                                gridData={data_strings} />
                                </div>
                <br></br>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                    <Footer ></Footer>
                </div>
                ):(<Loader/>)}
                </React.Fragment>

            )
        } catch(error){
            console.log(error)
            alert("Login Again please")

            return <Redirect to="/login" />
        }
    }
}