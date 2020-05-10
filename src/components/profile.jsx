import React, {useState} from 'react';
import Header from "../components/Header/Header";
import HeaderLinks from "../components/Header/DashHeaderLink";
import Footer from "../components/Footer/Footer";
import LeftHeader from "../components/Header/leftheader";
import { Redirect } from "react-router-dom";
import { Session } from 'bc-react-session';
import firebase from "../firebase";
import { makeStyles } from "@material-ui/core/styles";
/* eslint-disable react-hooks/rules-of-hooks */
import BackgroundImg from "../img/profilebackground.jpg";
import "../Styles/profileStyle.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { element } from 'prop-types';



const session = Session.get();
var myListBooks=[]
var elements

export default function profile(props) {
    if (session.isValid === false) {
        alert('Please Login First!');
        return <Redirect to="/login" />
    }
    
    else {
        try {
            const [myList,setMyList]=useState({
                hasLoaded:false
            })
            const [ratingState,setRatingState]=useState({
                ratinghasLoaded:false,
                ratingbooks:[],
                ratingerror:null
            })
            const [userId,setUserId]=useState(0)
            const [deleteBook,setDeleteBook]=useState(false)

            function fetchBooksRating(){
                        
                fetch("http://127.0.0.1:5000/ratingbased")
                        .then(response=>response.json())
                        .then((data)=>{
                            // console.log(data)
                            setRatingState({
                                ratingbooks:data,
                                ratinghasLoaded:true
                            })
                            
                        })
                        .catch(ratingerror=>setRatingState({
                            ratingerror,
                            ratinghasLoaded:true}))
                            
                            
                        }

            useEffect(()=>{
                fetchBooksRating()
                firebase.readMyList(firebase.getCurrentUID(),firebase.getCurrentUsername())
                .then((response)=>{
                    // console.log(response)
                    myListBooks=response.map(book=>{
                        const{Title,Bookid
                            // ,Bookid,ImgURL,Desc
                        }=book
                        
                        return {
                            // id:Bookid,image:ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,
                        title:Title,id:Bookid
                        // ,desc:Desc,imageBg:ImgURL
                    }
                        
                    })
                   setMyList({hasLoaded:true})
                    // console.log(myListBooks[0].title)
                })
                
                
            },[userId])
            
            // var str = '<ul>'
            const {hasLoaded}=myList
            if(hasLoaded){
            // myListBooks= myListBooks.map((booksArray)=>{return booksArray.title})
            // myListBooks.forEach(function(books) {
                
            //     str += '<li>'+ books  + `<button >🗑️</button>` + '</li>';
            // }); 
            // str += '</ul>';
            // console.log(str)
            // document.getElementById("myListContainer").innerHTML = str;

            elements=myListBooks.map((element)=>{
                return(
                <li key={element.id}>--> {element.title}
                <button style={{backgroundColor:'transparent', border:'none'}} onClick={()=>{deleteValue(element.id,element.title)}}>🗑️</button>
                </li>
                )
            })
            const deleteValue=(e,h)=>{
                if (window.confirm('Are you sure you want to delete '+ h + '?')) {
                    firebase.deleteBook(e)
                    console.log('Deleted Book:- ',h);
                    setDeleteBook(true)
                    
                } else {
                    // Do nothing!
                    // console.log('Thing was not saved to the database.');
                }
                // window.location.reload()
            }
            }
            if(deleteBook){
                firebase.readMyList(firebase.getCurrentUID(),firebase.getCurrentUsername())
                .then((response)=>{
                    // console.log(response)
                    myListBooks=response.map(book=>{
                        const{Title,Bookid
                            // ,Bookid,ImgURL,Desc
                        }=book
                        
                        return {
                            // id:Bookid,image:ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,
                        title:Title,id:Bookid
                        // ,desc:Desc,imageBg:ImgURL
                    }
                        
                    })
                   setMyList({hasLoaded:true})
                    // console.log(myListBooks[0].title)
                })
            }
            
            return (
                <>
                
                    <div style={{
                        backgroundImage: `url(${BackgroundImg})`,

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

                    </div>
                            
                    <div class="wrapper2">
                        <div class="left">
                            {/* {console.log(firebase.getCurrentDisplayPhoto)} */}
                            <img src={firebase.getCurrentDisplayPhoto()} alt="user" width="100" />
                            <h4>{firebase.getCurrentUsername()}</h4>
                            <Link to="/editprofile"><h5> <u>Edit Profile? </u></h5></Link>
                            <br></br>
                            <Link to="/feedback"><h5> <u>Want to give a feedback? </u></h5></Link>

                        </div>
                        <div class="right">
                            <div class="info">
                                <h3>Information</h3>
                                <div class="info_data">
                                    <div class="data">
                                        <h4>Email</h4>
                                        <p>{firebase.getCurrentEmail()}</p>
                                    </div>
                                    
                                </div>
                            </div>

                            <div class="projects">
                                <h3>My Books</h3>
                                <div class="projects_data">
                                    <div class="data">
                                        
                                        <h4>My List</h4>
                                        <div id="myListContainer" style={{color:'#fead03'}}><ul>{elements}</ul>  </div>
                                        {/* <p>Lorem ipsum dolor sit amet.</p> */}
                                    </div>
                                    
                                </div>
                            </div>

                            
                        </div>
                    </div>



                    <Footer></Footer>
                </>
            )
        } catch(error){
            console.log(error)
        }
    }


    //  );
}
