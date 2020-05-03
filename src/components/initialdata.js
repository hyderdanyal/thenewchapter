// import React from "react";
// import ReactDOM from "react-dom"
// import "../Styles/initialdata.css"
// import ReactExpandableGrid from "./Grid/ExpandableSlider";
// import { useEffect } from "react";
// import { useState } from "react";
// import Loader from './loader'

// var rating_data
// var rating_data_strings



// class Popup extends React.Component {
//     render() {
//       return (
//         <div className='popup'>
//           <div className='popup_inner'>
//             <h1>{this.props.text}</h1>
//           <button onClick={this.props.closePopup}>close me</button>
//           </div>
//         </div>
//       );
//     }
//   }
//   class InitialData extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         showPopup: false
//       };
//     }
//     togglePopup() {
//       this.setState({
//         showPopup: !this.state.showPopup
//       });
//     }
//     componentDidMount(){
//         fetchBooksRating()

//     }
//     const [ratingState,setRatingState]=useState({
//         ratinghasLoaded:false,
//         ratingbooks:[],
//         ratingerror:null
//     })

//     const {ratinghasLoaded,ratingbooks,ratingerror}=ratingState
                                              
//      function fetchBooksRating(){
//         fetch("http://127.0.0.1:5000/ratingbased")
//         .then(response=>response.json())
//         .then((data)=>{
                                                    
//                                                     setRatingState({
//                                                         ratingbooks:data,
//                                                         ratinghasLoaded:true
//                                                     })
                                                    
//                                                 })
//                                                 .catch(ratingerror=>setRatingState({
//                                                     ratingerror,
//                                                     ratinghasLoaded:true}))
                                                    
                                                    
//                                                 }
                                        
//                                                     // const{ratinghasLoaded,ratingbooks,ratingerror}=ratingState
//                                                     // useEffect(()=>{
//                                                     //     fetchBooksRating()
//                                                     // })
                                                

//     rating_data=ratingbooks.map(book=>{
//                 const{Title,Bookid,ImgURL,Desc}=book
                
//                 return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                
//             })
//             rating_data_strings=JSON.stringify(rating_data)

//             rating_data=ratingbooks.map(book=>{
//                 const{Title,Bookid,ImgURL,Desc}=book
                
//                 return {'img':ImgURL,'link':`https://www.amazon.in/s?k=${Title}&i=stripbooks`,'title':Title,'description':Desc}
                
//             })
//             rating_data_strings=JSON.stringify(rating_data)

//     render() {
        
//       return (
//         <React.Fragment>
//                     {ratingerror ?<p>{ratingerror.message}</p> : null}
//                 {ratinghasLoaded ?(

//         <div className='app' id='content'>
//           <h1>hihi</h1>
//           <button onClick={this.togglePopup.bind(this)}>show popup</button>
//           <button onClick={() => {alert('woooooooot?');}}>try me when popup is open</button>
//           <p>Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br />Ganz viel inhalt.<br /></p>
//           {this.state.showPopup ? 
//             <Popup
//               text='Close Me'
//               closePopup={this.togglePopup.bind(this)}
//             />
//             : null
//           }
//            <div >
//                         <br></br>
//                         <h2><font color="#fead03"> Top Books </font></h2>
//                         <div>
//                         {ratinghasLoaded ? (
//                             <ReactExpandableGrid
//                             gridData={rating_data_strings} />
//                             ):(<Loader/>)}
//                                 </div>
//                             <br></br>
//                     </div>
                    
//         </div>
//         ):(<Loader/>)}
//         </React.Fragment>
//       );
//     }
//   };
  
  
  
// //   ReactDOM.render(
// //       document.getElementById('content'),
// //     <InitialData />
// //   );

//   export default InitialData;