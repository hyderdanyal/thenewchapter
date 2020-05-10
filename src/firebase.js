import app from 'firebase/app';
import 'firebase/firebase-firestore';
import 'firebase/auth';
import 'firebase/storage';
import firebase from "firebase"

var config = {
  apiKey: "AIzaSyAj6L6nME_IOb-NvW6hFqsb_AKYQ3Pk15Y",
  authDomain: "book-bf31c.firebaseapp.com",
  databaseURL: "https://book-bf31c.firebaseio.com",
  projectId: "book-bf31c",
  storageBucket: "book-bf31c.appspot.com",
  messagingSenderId: "29877262803",
  appId: "1:29877262803:web:dd2b8f42bd475aaa4cf726",
  measurementId: "G-542LZTKW60"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.storage = app.storage();
    this.firestore=app.firestore();
  }
  
  
   uploadImage(selectedFile) {
    
    const  image  = selectedFile;
    var updateDisplayPicture=app.auth().currentUser
    var uploadTask = this.storage.ref(`images/${this.getCurrentUsername()}.jpg`).put(image);

    // uploadTask.then(data=>console.log('uploaded', data)).catch(err=>console.error(err));
// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', function(snapshot){
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case firebase.storage.TaskState.PAUSED: // or 'paused'
      console.log('Upload is paused');
      break;
    case firebase.storage.TaskState.RUNNING: // or 'running'
      console.log('Upload is running');
      break;
  }
}, function(error) {
  console.log(error)
  // Handle unsuccessful uploads
}, function() {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  uploadTask.snapshot.ref.getDownloadURL().then(function( downloadURL) {
    console.log('File available at', downloadURL);
    updateDisplayPicture.updateProfile({photoURL:downloadURL})
    return (
      alert("Profile Updated Successfully. Thank You"),
      window.location.href="/profile")
  });

}
);

    //  this.storage.ref(`images/${firebase.getCurrentUsername}.jpeg`).put(image);
    // uploadTask.on(
    //   "state_changed",
    //   snapshot => {
    //     //progress function
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     setSelectedFile[progress] = progress
    //   })
    //   () => {
    //     this.storage
    //       .ref("images")
    //       .child(image.name)
    //       .getDownloadURL()
    //       .then(url => {
    //         setFile[url] = url
    //       })
    //   }
    // )
    // return (file, console.log("AAA", setFile));
  }
  uploadPhoto(downloadURL){
    console.log("DOWNLOADURL::",downloadURL)
    this.auth.currentUser.updateProfile({photoURL:downloadURL})
    console.log("PHOTOURL::",this.getCurrentDisplayPhoto())

  }
  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    firebase.auth().signOut()
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    var user = this.auth.currentUser;
    user.sendEmailVerification().then(function () {
      alert(`Verification Sent to ${email}`);
    }).catch(function (error) {
      alert("Error: ", error.message);
    });

    return this.auth.currentUser.updateProfile({
      displayName: name
    })
  }
  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    })
  }

  getCurrentUsername() {
    return this.auth.currentUser.displayName
  }
  getCurrentEmail() {
    return this.auth.currentUser.email
  }
  getCurrentDisplayPhoto() {
    return this.auth.currentUser.photoURL
  }
  getCurrentUID() {
    return this.auth.currentUser.uid
  }

  editProfile(name, email) {
   
    return (this.auth.currentUser.updateEmail(email),
      this.auth.currentUser.updateProfile({ displayName: name })
    )
  }
  addRating(name,uid,bookid,ratingValue){
    this.firestore.collection("ratings").doc(name).collection(uid).doc(bookid).set({
      userId: uid,
      bookId: bookid,
      ratingValue: ratingValue
  })
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }

  addMyList(name,uid,bookid,booktitle,bookdesc,bookimage){
    this.firestore.collection("mylist").doc(name).collection(uid).doc(bookid).set({
      userId: uid,
      Bookid: bookid,
      Title: booktitle,
      Desc: bookdesc,
      ImgURL: bookimage
  })
  
  // .then(function(docRef) {
  //     console.log("Document written with ID: ", docRef.id);
  // })
  .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }

  readMyList(uid,name){
    let db=app.firestore()
    const fetchedBooks = [];
    //  let myListPromise=new Promise((resolve,reject)=>{
    
    
    return db.collection("mylist").doc(name).collection(uid).get()
    .then(response => {
      response.forEach(document => {
        const fetchedBook = {
          id: document.id,
          ...document.data()
        };
        fetchedBooks.push(fetchedBook)
      })
        // console.log("HELLO",fetchedBooks)
        return new Promise((resolve,reject)=>{
          if(fetchedBooks.length>0){
            resolve(fetchedBooks)
          }

        
      });
     
    // })
    // console.log(fetchedBooks.length)
    
      // resolve(fetchedBooks)
      
    
    
  
  })
  
  // return myListPromise
  // .then((mylist)=>{return mylist})
}

deleteBook(id){
  let db=app.firestore()

  db.collection("mylist").doc(this.getCurrentUsername()).collection(this.getCurrentUID()).doc(id).delete()
  .then(()=>{console.log(id,' Deleted Successfully!')})

}

}



export default new Firebase();


// console.log("Current data: ", myListBooks);

// .onSnapshot(function(doc) {
//     console.log("Current data: ", doc.data());
//     // console.log("BID",doc.data().bookId)
// });