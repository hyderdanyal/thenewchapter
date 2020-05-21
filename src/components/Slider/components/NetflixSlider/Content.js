import React, { useState } from 'react';
import IconCross from './../Icons/IconCross';
import './Content.scss';
import Rating from "react-rating";
import firebase from '../../../../firebase'
import "../../../../Styles/GridButton.css"


const Content = ({ movie, onClose }) => {
  var [bookExists, setBookExists] = useState(false)
  firebase.bookExists(movie.id).then(() => { setBookExists(true) })
  // .catch(() => { setBookExists(false) })
  return (
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
          className="content__background__image" style={{ left: '90vh', top: '20vh', color: "#fead03", position: "relative", width: "fit-content" }}>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />

          {bookExists ? (<button className="gridbutton" onClick={() => {
            firebase.deleteBook(movie.id)
            setBookExists(false)
          }}>Remove from My List</button>) : (<button className="gridbutton" onClick={() => {
            firebase.addMyList(firebase.getCurrentUsername(), firebase.getCurrentUID(), movie.id, movie.title, movie.desc, movie.image)
            setBookExists(true)
          }}>Add to My List</button>)}
          <br></br><br></br><br></br>
          <Rating
            emptySymbol="fa fa-star-o fa-2x"
            fullSymbol="fa fa-star fa-2x"
            fractions={2}
            onClick={(value) => {
              firebase.addRating(firebase.getCurrentUsername(), firebase.getCurrentUID(), movie.id, value)
            }}
          />
          {}
          <br></br><br></br><br></br>
          <a className="gridlink" href={`https://www.amazon.in/s?k=${movie.title}&i=stripbooks`} target="blank"> Get Book -></a>

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
  )
}

export default Content;
