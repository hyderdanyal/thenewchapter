import React from 'react';
import IconCross from './../Icons/IconCross';
import './Content.scss';
import Rating from "react-rating";
import firebase from '../../../../firebase'

// var db = firebase.firestore()
const Content = ({ movie, onClose }) => (
  <div className="content">
    <div className="content__background">
    <button className="content__close" onClick={onClose}>
        <IconCross />
      </button>
      <div className="content__background__shadow" />
      {/* <div
        className="content__background__image"
        style={{ 'background-image': `url(${movie.imageBg})` }}
      /> */}
      <div 
      className="content__background__image" style={{left:'90vh', top:'30vh', color:"#fead03"}}> 
                            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />

                                <Rating
                                emptySymbol="fa fa-star-o fa-2x"
                                fullSymbol="fa fa-star fa-2x"
                                fractions={2}
                                onClick={(value)=>{
                                  firebase.addRating(firebase.getCurrentUsername(),firebase.getCurrentUID(),movie.id,value)
                                  console.log(firebase.getCurrentUID(),movie.id,value)
                                }}
                                />
                                <br></br>
                                <button onClick={(value)=>{
                                  firebase.addMyList(firebase.getCurrentUsername(),firebase.getCurrentUID(),movie.id,movie.title,movie.desc,movie.image)
                                  console.log(firebase.getCurrentUID(),movie.id,movie.title,movie.desc,movie.image)
                                }}>Add to My List</button>
                                </div>
    </div>
    <div className="content__area">
      <div className="content__area__container">
        <div className="content__title">{movie.title}</div>
        <div className="content__description">
          {movie.desc}
          <br></br>
        </div>
      </div>
     
      
    </div>
  </div>
);

export default Content;
