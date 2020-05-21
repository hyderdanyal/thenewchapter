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
    this.firestore = app.firestore();
  }


  uploadImage(selectedFile) {

    const image = selectedFile;
    var updateDisplayPicture = app.auth().currentUser
    var uploadTask = this.storage.ref(`images/${this.getCurrentUsername()}.jpg`).put(image);


    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function (snapshot) {
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
    }, function (error) {
      console.log(error)
      // Handle unsuccessful uploads
    }, function () {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log('File available at', downloadURL);
        updateDisplayPicture.updateProfile({ photoURL: downloadURL })
        return (
          alert("Profile Updated Successfully. Thank You"),
          window.location.href = "/profile")
      });

    }
    );


  }
  uploadPhoto(downloadURL) {
    this.auth.currentUser.updateProfile({ photoURL: downloadURL })

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
    this.firestore.collection("ratings").doc(name).set({})
    this.firestore.collection("mylist").doc(name).set({})
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
  addRating(name, uid, bookid, ratingValue) {
    this.firestore.collection("ratings").doc(name)
      .get().then(doc => {
        if (doc.exists) {

          this.firestore.collection("ratings").doc(uid).collection('review').doc(bookid).set({
            user_id: uid,
            book_id: bookid,
            rating: ratingValue,
            reviewed: true
          })
        }
        else {
          this.firestore.collection("ratings").doc(uid).set({})
          this.firestore.collection("ratings").doc(uid).collection('review').doc(bookid).set({
            user_id: uid,
            book_id: bookid,
            rating: ratingValue,
            reviewed: true
          })
        }
      })

      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

  addMyList(name, uid, bookid, booktitle, bookdesc, bookimage) {
    this.firestore.collection("mylist").doc(uid)
      .get().then(doc => {
        if (doc.exists) {
          this.firestore.collection("mylist").doc(uid).collection(uid).doc(bookid).set({
            userId: uid,
            Bookid: bookid,
            Title: booktitle,
            Desc: bookdesc,
            ImgURL: bookimage
          })
        }
        else {

          this.firestore.collection("mylist").doc(uid).set({})
          this.firestore.collection("mylist").doc(uid).collection(uid).doc(bookid).set({
            userId: uid,
            Bookid: bookid,
            Title: booktitle,
            Desc: bookdesc,
            ImgURL: bookimage
          })
        }
      })


      .catch(function (error) {
        console.error("Error adding document: ", error);
      })
  }

  readMyList(uid, name) {
    let db = app.firestore()
    const fetchedBooks = [];



    return db.collection("mylist").doc(uid).collection(uid).get()
      .then(response => {
        response.forEach(document => {
          const fetchedBook = {
            id: document.id,
            ...document.data()
          };
          fetchedBooks.push(fetchedBook)
        })

        return new Promise((resolve, reject) => {
          if (fetchedBooks.length > 0) {
            resolve(fetchedBooks)
          }
          else {
            reject('My List Empty')
          }


        });



      })


  }

  deleteBook(id) {
    let db = app.firestore()

    db.collection("mylist").doc(this.getCurrentUID()).collection(this.getCurrentUID()).doc(id).delete()
      .then(() => { console.log(id, ' Deleted Successfully!') })

  }

  bookExists(bookid) {

    let db = app.firestore()
    var docRef = db.collection('mylist').doc(this.getCurrentUID()).collection(this.getCurrentUID()).doc(bookid)
    return docRef.get().then(function (doc) {
      return new Promise((resolve, reject) => {
        if (doc.exists) {
          resolve(true)
        } else {
          reject(false)
        }
      })
    })




  }

}



export default new Firebase();


