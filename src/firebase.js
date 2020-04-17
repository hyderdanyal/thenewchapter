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
  }


  async  uploadImage(file, setFile) {

    const { image } = file;
    const uploadTask = this.storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setFile[progress] = progress
      },
      () => {
        this.storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            setFile[url] = url
          })
      }
    )
    return (file, console.log("AAA", setFile));
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
  getCurrentPhone() {
    return this.auth.currentUser.phoneNumber
  }
  getCurrentUID() {
    return this.auth.currentUser.uid
  }

  editProfile(name, email) {

    return (this.auth.currentUser.updateEmail(email),
      this.auth.currentUser.updateProfile({ displayName: name })
    )
  }

}

export default new Firebase();

